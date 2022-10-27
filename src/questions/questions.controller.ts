import { Body, Controller, Post } from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { QuestionDto } from "./dto/question.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Questions")
@Controller("/api/questions")
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @ApiOperation({ parameters: [{ in: "header", name: "token" }], summary: "Create question" })
  @ApiResponse({ status: 200 })
  @Post("/create-question")
  async createQuestion(@Body() question: QuestionDto) {
    return this.questionsService.createQuestion(question)
  }
}
