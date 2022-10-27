import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base-entity";

@Entity("questions")
export class QuestionsEntity extends BaseEntity {
  @Column({ nullable: false, type: "varchar" })
  private readonly title: string;
  @Column({ type: "integer", default: 0 })
  private readonly rating: number;
  @Column({ nullable: false, type: "varchar", unique: true })
  private readonly author: string
  @Column({ nullable: false, type: "varchar" })
  private readonly description: string;
  @Column({ nullable: false, type: "varchar" })
  private readonly tags: string[];
}