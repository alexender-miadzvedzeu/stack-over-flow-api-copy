import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../base-entity";
import { UsersEntity } from "../users/users.entity";

@Entity("questions")
export class QuestionsEntity extends BaseEntity {
  @Column({ nullable: false, type: "varchar" })
  title: string;
  @Column({ type: "integer", default: 0 })
  rating: number;
  @Column({ nullable: false, type: "varchar" })
  description: string;
  @ManyToOne(() => UsersEntity, user => user.uuid)
  author: UsersEntity
}