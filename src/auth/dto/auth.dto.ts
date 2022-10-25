import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
  @ApiProperty({ example: "test@test.com", description: "User email" })
  readonly email: string;
  @ApiProperty({ example: "ABCabc123", description: "User password" })
  readonly password: string;
}