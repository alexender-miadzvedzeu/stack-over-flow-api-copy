import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AnswerDto } from "./dto/answer.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { AnswersEntity } from "./answers.entity";
import { DataSource, Repository } from "typeorm";
import { UsersEntity } from "@Users/users.entity";
import { QuestionsEntity } from "@Questions/questions.entity";
import { UpdateAnswerDto } from "@Answers/dto/update-answer.dto";

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(AnswersEntity)
    private readonly answersRepository: Repository<AnswersEntity>,
    private dataSource: DataSource,
  ) {}

  async addAnswerToQuestion (answerDto: AnswerDto, user: UsersEntity) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const questionToUpdate = await this.dataSource.manager.findOne(QuestionsEntity, { where: { uuid: answerDto.questionUuid } })
      const answer = new AnswersEntity();
      answer.author = user;
      answer.description = answerDto.description;
      answer.question = questionToUpdate;
      const { uuid } = await this.dataSource.manager.save(answer);
      await queryRunner.commitTransaction();
      return uuid;
    } catch (e) {
      await queryRunner.rollbackTransaction()
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    } finally {
      await queryRunner.release();
    }
  }

  async deleteAnswer (uuid: string) {
    try {
      const answer = await this.answersRepository.findOneBy({ uuid })
      if (!answer) throw new HttpException("Answer doesn't exists", HttpStatus.NOT_FOUND)
      await this.answersRepository.remove(answer);
      return uuid;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  async updateAnswer (answerDto: UpdateAnswerDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const answerToEdit = await queryRunner.manager.findOne(AnswersEntity, { where: { uuid: answerDto.uuid }})
      if (!answerToEdit) throw new HttpException("Answer doesn't exists", HttpStatus.NOT_FOUND)
      await queryRunner.manager.update(AnswersEntity, answerDto.uuid, {
        description: answerDto.description,
      })
      if (answerDto.rating === "inc") await queryRunner.manager.increment(AnswersEntity, { uuid: answerDto.uuid }, "rating", 1)
      if (answerDto.rating === "decr") await queryRunner.manager.decrement(AnswersEntity, { uuid: answerDto.uuid }, "rating", 1)
      await queryRunner.commitTransaction();
      return answerDto.uuid;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    } finally {
      await queryRunner.release();
    }
  }

  async getAllAnswers () {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const answers = await this.dataSource.manager.find(AnswersEntity, { relations: { question: true }});
      await queryRunner.commitTransaction();
      return answers
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    } finally {
      await queryRunner.release();
    }
  }
}
