import { Module } from "@nestjs/common";
import { QuestionsController } from "./questions.controller";
import { QuestionsService } from "./questions.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuestionsEntity } from "./questions.entity";
import { AuthModule } from "../auth/auth.module";
import { TagsModule } from "../tags/tags.module";

@Module({
  imports: [TypeOrmModule.forFeature([QuestionsEntity]), AuthModule, TagsModule],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
