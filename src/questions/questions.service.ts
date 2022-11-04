import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { QuestionsEntity } from "./questions.entity";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { UsersEntity } from "../users/users.entity";
import { QuestionDto } from "./dto/question.dto";

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionsEntity)
    private readonly questionsRepository: Repository<QuestionsEntity>,
    private dataSource: DataSource,
) {}

  async getAllQuestions () {
    try {
      return this.questionsRepository.find({
        select: {
          uuid: true,
          title: true,
          description: true,
        }
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  async getQuestionByUuid (uuid: string) {
    try {
      return this.questionsRepository.findOne({
        where: { uuid },
        relations: {
          answers: true,
        }
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  async createQuestion (question: QuestionDto, user: UsersEntity) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const questionEntity = new QuestionsEntity();
      questionEntity.title = question.title;
      questionEntity.description = question.description;
      questionEntity.author = user;
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
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const questionToEdit = await queryRunner.manager.findOne(QuestionsEntity, { where: { uuid: question.uuid }})
      if (!questionToEdit) throw new HttpException("Question doesn't exists", HttpStatus.NOT_FOUND)
      await queryRunner.manager.update(QuestionsEntity, questionToEdit.uuid, {
        title: question.title,
        description: question.description,
      })
      if (question.rating === "inc") await queryRunner.manager.increment(QuestionsEntity, { uuid: questionToEdit.uuid }, "rating", 1)
      if (question.rating === "decr") await queryRunner.manager.decrement(QuestionsEntity, { uuid: questionToEdit.uuid }, "rating", 1)
      await queryRunner.commitTransaction();
      return question.uuid;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    } finally {
      await queryRunner.release();
    }
  }

  async deleteQuestion (uuid: string) {
    try {
      const question = await this.questionsRepository.findOneBy({ uuid });
      if (!question) throw new HttpException("Question not found", HttpStatus.NOT_FOUND);
      await this.questionsRepository.remove(question);
      return uuid;
    }catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }
}
