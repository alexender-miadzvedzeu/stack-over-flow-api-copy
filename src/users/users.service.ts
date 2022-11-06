import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { UsersEntity } from "@Users/users.entity";
import { AuthDto } from "@Auth/dto/auth.dto";
import { RoleEntity } from "@Role/role.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    private dataSource: DataSource
  ) {}

  async getUserByEmail(userDto: AuthDto) {
    try {
      return this.userRepository.findOne({
        where: {
          email: userDto.email
        },
        relations: {
          role: true,
        }
      })
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
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
      await queryRunner.rollbackTransaction();
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    } finally {
      await queryRunner.release();
    }
  }

  async getUsers() {
    try {
      return await this.userRepository.find({
        relations: {
          role: true,
          sessions: true,
        },
        select: {
          email: true,
          uuid: true,
          createdAt: true,
          updatedAt: true,
        }
      })
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  async deleteUser (uuid: string) {
    try {
      const user = await this.userRepository.findOneBy({ uuid })
      if (!user) throw new HttpException("User not found", HttpStatus.BAD_REQUEST)
      return await this.userRepository.remove(user)
    } catch (e) {
      console.log(JSON.stringify(e))
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }
}
