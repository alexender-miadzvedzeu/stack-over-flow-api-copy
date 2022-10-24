import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base-entity";

@Entity("questions")
export class QuestionsEntity extends BaseEntity {
  @Column()
  rating: number;
  @Column({ unique: true })
  author: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column("varchar", { array: true })
  tags: string[];
}
