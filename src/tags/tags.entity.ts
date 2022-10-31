import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base-entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity("tags")
export class TagsEntity extends BaseEntity {
  @ApiProperty({ example: "Tag", description: "Question tag" })
  @Column({ unique: true, nullable: false, type: "varchar" })
  tag: string;
}
