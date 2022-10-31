import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity("base")
export class BaseEntity {
  @ApiProperty({ example: "10d508aa-a286-45cb-b7ed-ff2e7d4a6cbd", description: "Uuid" })
  @PrimaryGeneratedColumn("uuid")
  uuid: string;
  @ApiProperty({ example: "2022-10-24 19:21:27.948659", description: "Date" })
  @CreateDateColumn({ nullable: true })
  createdAt: Date;
  @ApiProperty({ example: "2022-10-24 19:21:27.948659", description: "Date" })
  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;
}
