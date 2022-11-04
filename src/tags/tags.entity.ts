import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../base-entity";
import { ApiProperty } from "@nestjs/swagger";
import { UsersEntity } from "../users/users.entity";

@Entity("tags")
export class TagsEntity extends BaseEntity {
  @ApiProperty({ example: "Tag", description: "Question tag" })
  @Column({ unique: true, nullable: false, type: "varchar" })
  tag: string;
  @ManyToOne(() => UsersEntity, user => user.uuid, { onDelete: "CASCADE" } )
  author: UsersEntity
}
