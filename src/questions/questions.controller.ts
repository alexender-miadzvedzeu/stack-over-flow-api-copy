import { Body, Controller, Delete, Get, Post, Query, Put, UseGuards, Param, HttpStatus } from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesAuthGuard } from "../auth/roles-auth.guard";
import { QuestionDto } from "./dto/question.dto";
import { User } from "../auth/user.decorator";
import { UsersEntity } from "../users/users.entity";
import { RepositoryDecorator } from "../auth/repository.decorator";
import { QuestionsEntity } from "./questions.entity";
import { IsAuthorAuthGuard } from "../auth/isAuthor-auth.guard";
import { GetAllQuestionsResponseDto } from "./dto/get-all-questions-response.dto";
import { GetQuestionByUuidResponseDto } from "./dto/get-question-by-uuid-response.dto";
import { UpdateQuestionTagsDto } from "./dto/update-question-tags.dto";

@ApiTags("Questions")
@ApiHeader({
  name: "Authentication",
  description: "Bearer {token}",
  required: true,
})
@Controller("/api/questions")
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @ApiOperation({ summary: "Get all questions" })
  @ApiResponse({ status: HttpStatus.OK, type: [GetAllQuestionsResponseDto]})
  @Get()
  getAllQuestions() {
    return this.questionsService.getAllQuestions()
  }

  @ApiOperation({ summary: "Get question by uuid" })
  @ApiResponse({ status: HttpStatus.OK, type: GetQuestionByUuidResponseDto, description: "Get question by uuid" })
  @Get(":uuid")
  getQuestionByUuid(@Param("uuid") uuid: string) {
    return this.questionsService.getQuestionByUuid(uuid);
  }

  @Roles("user", "admin")
  @UseGuards(RolesAuthGuard)
  @ApiOperation({ summary: "Create question" })
  @ApiResponse({ status: HttpStatus.OK, type: "string", description: "Created question uuid" })
  @Post()
  createQuestion(@Body() question: QuestionDto, @User() user: UsersEntity) {
    return this.questionsService.createQuestion(question, user)
  }

  @Roles("user", "admin")
  @RepositoryDecorator(QuestionsEntity)
  @UseGuards(RolesAuthGuard, IsAuthorAuthGuard)
  @ApiOperation({ summary: "Update question" })
  @ApiResponse({ status: HttpStatus.OK, type: "string", description: "Updated question uuid" })
  @Put()
  updateQuestion(@Body() question: UpdateQuestionDto) {
    return this.questionsService.updateQuestion(question)
  }

  @Roles("user", "admin")
  @RepositoryDecorator(QuestionsEntity)
  @UseGuards(RolesAuthGuard, IsAuthorAuthGuard)
  @ApiOperation({ summary: "Delete question" })
  @ApiResponse({ status: HttpStatus.OK, type: "string", description: "Updated question uuid" })
  @Delete()
  deleteQuestion(@Query("uuid") uuid: string) {
    return this.questionsService.deleteQuestion(uuid);
  }

  @Roles("admin")
  @UseGuards(RolesAuthGuard)
  @ApiOperation({ summary: "Update question tags" })
  @Put("/tags")
  updateQuestionTags(@Body() body: UpdateQuestionTagsDto) {
    return this.questionsService.updateQuestionTags(body);
  }
}
