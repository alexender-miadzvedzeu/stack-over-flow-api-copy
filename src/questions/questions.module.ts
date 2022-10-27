import { Module } from "@nestjs/common";
import { QuestionsController } from "./questions.controller";
import { QuestionsService } from "./questions.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuestionsEntity } from "./questions.entity";

@Module({
  imports: [TypeOrmModule.forFeature([QuestionsEntity])],
  controllers: [QuestionsController],
  providers: [QuestionsService]
})
export class QuestionsModule {}
