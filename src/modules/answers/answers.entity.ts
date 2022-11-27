import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "@/base-entity";
import { UsersEntity } from "@Users//users.entity";
import { QuestionsEntity } from "@Questions/questions.entity";

@Entity("answers")
export class AnswersEntity extends BaseEntity {
  @Column({ type: "integer", default: 0 })
  rating: number;
  @Column({ nullable: false, type: "varchar" })
  description: string;
  @ManyToOne(() => UsersEntity, user => user.uuid, {
    cascade: true,
    onDelete: "CASCADE"
  })
  author: UsersEntity
  @ManyToOne(() => QuestionsEntity, question => question.answers, {
    cascade: true,
    onDelete: "CASCADE"
  })
  question: QuestionsEntity
}