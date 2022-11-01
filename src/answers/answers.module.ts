import { Module } from "@nestjs/common";
import { AnswersController } from "./answers.controller";
import { AnswersService } from "./answers.service";
import { QuestionsModule } from "../questions/questions.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnswersEntity } from "./answers.entity";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([AnswersEntity]), QuestionsModule, AuthModule],
  controllers: [AnswersController],
  providers: [AnswersService]
})
export class AnswersModule {}
