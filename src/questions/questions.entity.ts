import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base-entity";
import { UsersEntity } from "../users/users.entity";
import { AnswersEntity } from "../answers/answers.entity";

@Entity("questions")
export class QuestionsEntity extends BaseEntity {
  @Column({ nullable: false, type: "varchar" })
  title: string;
  @Column({ type: "integer", default: 0 })
  rating: number;
  @Column({ nullable: false, type: "varchar" })
  description: string;
  @ManyToOne(() => UsersEntity, user => user.uuid, { onDelete: "CASCADE" } )
  author: UsersEntity
  @OneToMany(() => AnswersEntity, answer => answer.question)
  answers: AnswersEntity[]
}