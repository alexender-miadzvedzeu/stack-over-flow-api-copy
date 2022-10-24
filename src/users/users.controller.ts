import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("/api/users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }
  @Get()
  getAllUsers() {
    return this.userService.getUsers();
  }
}
