import { Body, Controller, Delete, Get, Param, Post, Put, Headers, UseGuards } from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { ApiHeader, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { QuestionsEntity } from "./questions.entity";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesAuthGuard } from "../auth/roles-auth.guard";

@Roles("user", "admin")
@UseGuards(RolesAuthGuard)
@ApiTags("Questions")
@ApiHeader({
  name: "Authentication",
  description: "Bearer {token}",
  required: true,
})
@Controller("/api/questions")
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @ApiOperation({ summary: "Get question" })
  @Get()
  async getAllQuestions() {
    return this.questionsService.getAllQuestions()
  }

  @ApiOperation({ summary: "Create question" })
  @Post()
  async createQuestion(
    @Body() question: QuestionsEntity,
    @Headers() headers
  ) {
    return this.questionsService.createQuestion(question, headers.authorization)
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
