import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "@/base-entity";
import { ApiProperty } from "@nestjs/swagger";
import { RoleEntity } from "@Role/role.entity";
import { SessionsEntity } from "@Auth/auth.entity";

@Entity("users")
export class UsersEntity extends BaseEntity {
  @ApiProperty({ example: "test@test.com", description: "User email" })
  @Column({ unique: true, nullable: false })
  email: string;
  @ApiProperty({ example: "ABCabc123", description: "User password" })
  @Column({ nullable: false })
  password: string;

  @OneToMany(() => SessionsEntity, session => session.user)
  sessions: SessionsEntity[]

  @ManyToOne(() => RoleEntity, role => role.uuid, {
    cascade: true,
    onDelete: "CASCADE"
  })
  role: RoleEntity;
}
