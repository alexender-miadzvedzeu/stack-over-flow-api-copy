import { Module } from "@nestjs/common";
import { AnswersController } from "@/modules/answers/answers.controller";
import { AnswersService } from "@/modules/answers/answers.service";
import { QuestionsModule } from "@Questions/questions.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnswersEntity } from "@/modules/answers/answers.entity";
import { AuthModule } from "@Auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([AnswersEntity]),
    QuestionsModule,
    AuthModule,
  ],
  controllers: [AnswersController],
  providers: [AnswersService],
})
export class AnswersModule {}
