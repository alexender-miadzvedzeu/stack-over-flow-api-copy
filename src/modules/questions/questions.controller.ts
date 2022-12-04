import { Body, Controller, Delete, Get, Post, Query, Put, UseGuards, Param, HttpStatus } from "@nestjs/common";
import { QuestionsService } from "@Questions/questions.service";
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { Roles } from "@Auth/decorators/roles-auth.decorator";
import { RolesAuthGuard } from "@Auth/guards/roles-auth.guard";
import { QuestionDto } from "@Questions/dto/question.dto";
import { User } from "@Auth/decorators/user.decorator";
import { UsersEntity } from "@Users/users.entity";
import { RepositoryDecorator } from "@/modules/auth/decorators/repository.decorator";
import { QuestionsEntity } from "@Questions/questions.entity";
import { IsAuthorAuthGuard } from "@/modules/auth/guards/isAuthor-auth.guard";
import { GetAllQuestionsResponseDto } from "@Questions/dto/get-all-questions-response.dto";
import { GetQuestionByUuidResponseDto } from "@Questions/dto/get-question-by-uuid-response.dto";
import { UpdateQuestionTagsDto } from "@Questions/dto/update-question-tags.dto";

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
  getAllQuestions(@Query("tags") tags: string) {
    return this.questionsService.getAllQuestions(tags)
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
