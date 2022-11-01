import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../base-entity";
import { UsersEntity } from "../users/users.entity";
import { QuestionsEntity } from "../questions/questions.entity";

@Entity("answers")
export class AnswersEntity extends BaseEntity {
  @Column({ type: "integer", default: 0 })
  rating: number;
  @Column({ nullable: false, type: "varchar" })
  description: string;
  @ManyToOne(() => UsersEntity, user => user.uuid)
  author: UsersEntity
  @ManyToOne(() => QuestionsEntity, question => question.uuid)
  question: QuestionsEntity
}