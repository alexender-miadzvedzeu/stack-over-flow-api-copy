import { Module } from "@nestjs/common";
import { RoleController } from "@Role/role.controller";
import { RoleService } from "@Role/role.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity } from "@Role/role.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
