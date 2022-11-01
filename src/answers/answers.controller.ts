import { Controller, Post } from "@nestjs/common";
import { AnswersService } from "./answers.service";
import { AnswerDto } from "./dto/answer.dto";

@Controller("/api/answers")
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  async addAnswerToQuestion (answerDto: AnswerDto) {
    return this.answersService.addAnswerToQuestion(answerDto)
  }
}
