import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base-entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity("role")
export class RoleEntity extends BaseEntity {
  @ApiProperty({ example: "user", description: "User role: admin || user" })
  @Column({ unique: true, nullable: false })
  value: string;
  @ApiProperty({ example: "Some text...", description: "User role description" })
  @Column({ nullable: false })
  description: string;
}
