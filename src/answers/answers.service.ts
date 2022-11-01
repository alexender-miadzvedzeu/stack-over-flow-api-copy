import { Injectable } from "@nestjs/common";
import { AnswerDto } from "./dto/answer.dto";

@Injectable()
export class AnswersService {

  async addAnswerToQuestion (answerDto: AnswerDto) {
    console.log(answerDto)
    return "Add answer to question"
  }
}
