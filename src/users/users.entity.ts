import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base-entity";

@Entity("users")
export class UsersEntity extends BaseEntity {
  @Column()
  email: string;
  @Column()
  password: string;
}
