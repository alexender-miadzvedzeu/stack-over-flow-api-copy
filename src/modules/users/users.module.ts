import { Module } from "@nestjs/common";
import { UsersController } from "@Users/users.controller";
import { UsersService } from "@Users/users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersEntity } from "@Users/users.entity";
import { AuthModule } from "@Auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
