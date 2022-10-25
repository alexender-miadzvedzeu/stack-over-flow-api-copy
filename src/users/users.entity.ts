import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base-entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity("users")
export class UsersEntity extends BaseEntity {
  @ApiProperty({ example: "test@test.com", description: "User email" })
  @Column({ unique: true, nullable: false })
  email: string;
  @ApiProperty({ example: "ABCabc123", description: "User password" })
  @Column({ nullable: false })
  password: string;
}
