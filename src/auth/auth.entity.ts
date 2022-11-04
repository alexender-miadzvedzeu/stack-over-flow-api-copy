import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../base-entity";
import { UsersEntity } from "../users/users.entity";

@Entity("sessions")
export class SessionsEntity extends BaseEntity {
  @Column({ unique: true, nullable: false })
  token: string;
  @ManyToOne(() => UsersEntity, user => user.sessions, {
    cascade: true,
    onDelete: "CASCADE"
  })
  user: UsersEntity
}
