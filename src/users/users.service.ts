import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersEntity } from "./users.entity";
import { UserDto } from "./dto/user.dto";
import { AuthDto } from "../auth/dto/auth.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}
  async getUserByEmail(userDto: AuthDto): Promise<UserDto[]> {
    return this.userRepository.find({
      where: {
        email: userDto.email
      }
    })
  }
  async createUser(userDto: AuthDto) {
    return this.userRepository.save(userDto)
  }
  async getUsers() {
    return this.userRepository.find();
  }
}
