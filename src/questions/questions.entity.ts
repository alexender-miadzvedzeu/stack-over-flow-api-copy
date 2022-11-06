import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "@/base-entity";
import { UsersEntity } from "@Users/users.entity";
import { AnswersEntity } from "@Answers/answers.entity";
import { TagsEntity } from "@Tags/tags.entity";

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
  @ManyToMany(() => TagsEntity)
  @JoinTable()
  tags: TagsEntity[]
}