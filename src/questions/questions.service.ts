import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { QuestionsEntity } from "./questions.entity";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { JwtService } from "@nestjs/jwt";
import { UsersEntity } from "../users/users.entity";
import { QuestionDto } from "./dto/question.dto";

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionsEntity)
    private readonly questionsRepository: Repository<QuestionsEntity>,
    private dataSource: DataSource,
    private jwtService: JwtService
) {}

  async getAllQuestions () {
    try {
      return this.questionsRepository.find({
        relations: {
          author: true,
        },
        select: {
          uuid: true,
        }
      });
    }catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  async createQuestion (question: QuestionDto, authorization: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const [_, token] = authorization.split(" ");
      const userData = await this.jwtService.decode(token) as UsersEntity;
      const userEntity = await this.dataSource.manager.findOne(UsersEntity, {
        where: {
          uuid: userData.uuid
        },
        select: {
          uuid: true,
          email: true,
          createdAt: true,
          updatedAt: true
        }
      })
      const questionEntity = new QuestionsEntity();
      questionEntity.title = question.title;
      questionEntity.description = question.description;
      questionEntity.author = userEntity;
      const newQuestion = await this.dataSource.manager.save(questionEntity);
      await queryRunner.commitTransaction();
      return newQuestion;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    } finally {
      await queryRunner.release();
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
