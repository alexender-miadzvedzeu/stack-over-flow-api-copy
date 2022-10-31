import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
  @ApiProperty({ example: "user@gmail.com", description: "User email" })
  readonly email: string;
  @ApiProperty({ example: "password", description: "User password" })
  readonly password: string;
}