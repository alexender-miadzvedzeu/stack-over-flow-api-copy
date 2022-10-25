import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "../../base-entity";

export class UserDto extends BaseEntity {
  @ApiProperty({ example: "test@test.com", description: "User email" })
  readonly email: string;
  @ApiProperty({ example: "ABCabc123", description: "User password" })
  readonly password: string;
  @ApiProperty({ example: "admin", description: "User role", required: false })
  readonly role?: "admin" | "user";
}
