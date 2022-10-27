import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QuestionsEntity } from "./questions.entity";
import { QuestionDto } from "./dto/question.dto";

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionsEntity)
    private readonly questionsRepository: Repository<QuestionsEntity>
  ) {}

  async createQuestion (question: QuestionDto) {
    return console.log(`Create question: ${question}`)
  }
}
