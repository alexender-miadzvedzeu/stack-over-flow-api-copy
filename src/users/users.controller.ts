import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersEntity } from "./users.entity";

@ApiTags("Users")
@Controller("/api/users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, type: [UsersEntity] })
  @Get()
  getAllUsers() {
    return this.userService.getUsers();
  }
}
