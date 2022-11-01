import { Body, Controller, Delete, Get, Post, Query, Put, Headers, UseGuards } from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { ApiHeader, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesAuthGuard } from "../auth/roles-auth.guard";
import { QuestionDto } from "./dto/question.dto";
import { User } from "../auth/user.decorator";
import { UsersEntity } from "../users/users.entity";

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
  getAllQuestions() {
    return this.questionsService.getAllQuestions()
  }

  @ApiOperation({ summary: "Create question" })
  @Post()
  createQuestion(@Body() question: QuestionDto, @User() user: UsersEntity) {
    return this.questionsService.createQuestion(question, user)
  }

  @ApiOperation({ summary: "Update question" })
  @Put()
  updateQuestion(@Body() question: UpdateQuestionDto) {
    return this.questionsService.updateQuestion(question)
  }

  @ApiOperation({ summary: "Delete question" })
  @Delete()
  deleteQuestion(@Query("uuid") uuid: string) {
    return this.questionsService.deleteQuestion(uuid);
  }
}
