import { Module } from "@nestjs/common";
import { QuestionsController } from "@Questions/questions.controller";
import { QuestionsService } from "@Questions/questions.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuestionsEntity } from "@Questions/questions.entity";
import { AuthModule } from "@Auth/auth.module";
import { TagsModule } from "@Tags/tags.module";

@Module({
  imports: [TypeOrmModule.forFeature([QuestionsEntity]), AuthModule, TagsModule],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
