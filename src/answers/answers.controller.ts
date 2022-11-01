import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Query, UseGuards } from "@nestjs/common";
import { AnswersService } from "./answers.service";
import { AnswerDto } from "./dto/answer.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersEntity } from "../users/users.entity";
import { User } from "../auth/user.decorator";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesAuthGuard } from "../auth/roles-auth.guard";
import { AnswersEntity } from "./answers.entity";
import { UpdateAnswerDto } from "./dto/update-answer.dto";

@Roles("user", "admin")
@UseGuards(RolesAuthGuard)
@ApiTags("Answers")
@Controller("/api/answers")
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @ApiOperation({ summary: "Get all answers" })
  @ApiResponse({ status: HttpStatus.OK, type: [AnswersEntity] })
  @Get()
  getAllAnswers () {
    return this.answersService.getAllAnswers()
  }

  @ApiOperation({ summary: "Create answer" })
  @Post()
  addAnswerToQuestion (@Body() answerDto: AnswerDto, @User() user: UsersEntity) {
    return this.answersService.addAnswerToQuestion(answerDto, user)
  }

  @ApiOperation({ summary: "Update answer" })
  @Put()
  updateAnswer (@Body() answerDto: UpdateAnswerDto) {
    return this.answersService.updateAnswer(answerDto)
  }

  @ApiOperation({ summary: "Delete answer" })
  @ApiResponse({ status: HttpStatus.OK, type: [AnswersEntity] })
  @Delete()
  deleteAnswer (@Query("uuid") uuid: string) {
    return this.answersService.deleteAnswer(uuid);
  }
}
