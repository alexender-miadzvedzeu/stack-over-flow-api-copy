import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { QuestionDto } from "./dto/question.dto";
import { ApiHeader, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UpdateQuestionDto } from "./dto/update-question.dto";

@ApiTags("Questions")
@ApiHeader({
  name: "Authentication",
  description: "Bearer {token}",
  required: true,
})
@Controller("/api/questions")
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @ApiOperation({ summary: "Create question" })
  @Get()
  async getAllQuestions() {
    return this.questionsService.getAllQuestions()
  }

  @ApiOperation({ summary: "Create question" })
  @Post()
  async createQuestion(@Body() question: QuestionDto) {
    return this.questionsService.createQuestion(question)
  }

  @ApiOperation({ summary: "Update question" })
  @Put()
  async updateQuestion(@Body() question: UpdateQuestionDto) {
    return this.questionsService.updateQuestion(question)
  }

  @ApiOperation({ summary: "Delete question" })
  @Delete()
  async deleteQuestion(@Param("uuid") uuid: string) {
    return this.questionsService.deleteQuestion(uuid)
  }
}
