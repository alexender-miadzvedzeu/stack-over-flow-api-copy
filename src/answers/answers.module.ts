import { Module } from "@nestjs/common";
import { AnswersController } from "@Answers/answers.controller";
import { AnswersService } from "@Answers/answers.service";
import { QuestionsModule } from "@Questions/questions.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnswersEntity } from "@Answers/answers.entity";
import { AuthModule } from "@Auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([AnswersEntity]), QuestionsModule, AuthModule],
  controllers: [AnswersController],
  providers: [AnswersService]
})
export class AnswersModule {}
