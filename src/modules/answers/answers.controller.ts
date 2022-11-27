import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { AnswersService } from "@/modules/answers/answers.service";
import { AnswerDto } from "@/modules/answers/dto/answer.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersEntity } from "@Users/users.entity";
import { User } from "@Auth/user.decorator";
import { Roles } from "@Auth/roles-auth.decorator";
import { RolesAuthGuard } from "@Auth/roles-auth.guard";
import { AnswersEntity } from "@/modules/answers/answers.entity";
import { UpdateAnswerDto } from "@/modules/answers/dto/update-answer.dto";
import { RepositoryDecorator } from "@Auth/repository.decorator";
import { IsAuthorAuthGuard } from "@Auth/isAuthor-auth.guard";

@ApiTags("Answers")
@Controller("/api/answers")
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @ApiOperation({ summary: "Get all answers" })
  @ApiResponse({ status: HttpStatus.OK, type: [AnswersEntity] })
  @Get()
  getAllAnswers() {
    return this.answersService.getAllAnswers();
  }

  @Roles("user", "admin")
  @UseGuards(RolesAuthGuard)
  @ApiOperation({ summary: "Create answer" })
  @ApiResponse({
    status: HttpStatus.OK,
    type: "string",
    description: "Posted answer uuid",
  })
  @Post()
  addAnswerToQuestion(@Body() answerDto: AnswerDto, @User() user: UsersEntity) {
    return this.answersService.addAnswerToQuestion(answerDto, user);
  }

  @Roles("user", "admin")
  @RepositoryDecorator(AnswersEntity)
  @UseGuards(RolesAuthGuard, IsAuthorAuthGuard)
  @ApiOperation({ summary: "Update answer" })
  @ApiResponse({
    status: HttpStatus.OK,
    type: "string",
    description: "Updated answer uuid",
  })
  @Put()
  updateAnswer(@Body() answerDto: UpdateAnswerDto) {
    return this.answersService.updateAnswer(answerDto);
  }

  @Roles("user", "admin")
  @RepositoryDecorator(AnswersEntity)
  @UseGuards(RolesAuthGuard, IsAuthorAuthGuard)
  @ApiOperation({ summary: "Delete answer" })
  @ApiResponse({
    status: HttpStatus.OK,
    type: "string",
    description: "Deleted answer uuid",
  })
  @Delete()
  deleteAnswer(@Query("uuid") uuid: string) {
    return this.answersService.deleteAnswer(uuid);
  }
}
