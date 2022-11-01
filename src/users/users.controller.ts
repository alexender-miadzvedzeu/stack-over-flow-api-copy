import { Controller, Delete, Get, Param, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersEntity } from "./users.entity";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesAuthGuard } from "../auth/roles-auth.guard";

@ApiTags("Users")
@Controller("/api/users")
@Roles("admin")
@UseGuards(RolesAuthGuard)
@ApiHeader({
  name: "Authorization",
  description: "Bearer {token}",
  required: true,
  allowEmptyValue: false,
})
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, type: [UsersEntity] })
  @Get()
  getAllUsers() {
    return this.userService.getUsers();
  }

  @ApiOperation({ summary: "Delete user" })
  @ApiResponse({ status: 200 })
  @Delete()
  deleteUser(@Query("uuid") uuid: string) {
    return this.userService.deleteUser(uuid);
  }
}
