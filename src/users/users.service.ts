import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource } from "typeorm";
import { UsersEntity } from "./users.entity";
import { UserDto } from "./dto/user.dto";
import { AuthDto } from "../auth/dto/auth.dto";
import { RoleEntity } from "../role/role.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    private dataSource: DataSource
  ) {}

  async getUserByEmail(userDto: AuthDto) {
    return this.userRepository.find({
      where: {
        email: userDto.email
      }
    })
  }

  async createUser(userDto: AuthDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let userRole = await this.dataSource.manager.findOne(RoleEntity, { where: { value: "user" } });
      if (!userRole) {
        userRole = new RoleEntity()
        userRole.value = "user";
        userRole.description = "Provides to change only their own posts";
        await this.dataSource.manager.save(userRole);
      }
      const newUser = new UsersEntity();
      newUser.role = userRole;
      newUser.email = userDto.email;
      newUser.password = userDto.password;
      const data = await this.dataSource.manager.save(newUser);
      await queryRunner.commitTransaction();
      return data;
    } catch(e) {
      console.log(e)
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }

  async getUsers() {
    return await this.userRepository.find({
      relations: {
        role: true
      },
      select: {
        email: true,
        uuid: true,
        createdAt: true,
        updatedAt: true,
      }
    })
  }
}
