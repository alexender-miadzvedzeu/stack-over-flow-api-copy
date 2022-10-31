import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QuestionsEntity } from "./questions.entity";
import { QuestionDto } from "./dto/question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionsEntity)
    private readonly questionsRepository: Repository<QuestionsEntity>
  ) {}

  async getAllQuestions () {
    try {
      return this.questionsRepository.find();
    }catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  async createQuestion (question: QuestionDto) {
    try {
      return console.log(`Create question: ${question}`)
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  async updateQuestion (question: UpdateQuestionDto) {
    try {
      return console.log(`Update question: ${question}`)
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  async deleteQuestion (uuid: string) {
    try {
      return console.log(`Update question: ${uuid}`)
    }catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }
}
