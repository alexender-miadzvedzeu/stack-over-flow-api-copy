import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { QuestionsEntity } from "@Questions/questions.entity";
import { UpdateQuestionDto } from "@Questions/dto/update-question.dto";
import { UsersEntity } from "@Users/users.entity";
import { QuestionDto } from "@Questions/dto/question.dto";
import { UpdateQuestionTagsDto } from "@Questions/dto/update-question-tags.dto";
import { TagsService } from "@Tags/tags.service";

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionsEntity)
    private readonly questionsRepository: Repository<QuestionsEntity>,
    private readonly tagsService: TagsService,
    private dataSource: DataSource,
) {}

  async getAllQuestions (tags?: string) {
    const tagsArray = tags?.split(",")?.map(tag => ({ uuid: tag.trim() })).filter(({uuid}) => !!uuid);
    console.log(tagsArray)
    try {
      return this.questionsRepository.find({
        select: {
          uuid: true,
          title: true,
          description: true,
        },
        where: {
          tags: tagsArray
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
          tags: true
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
      const { uuid } = await this.dataSource.manager.save(questionEntity);
      await queryRunner.commitTransaction();
      return uuid;
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

  async updateQuestionTags (updateQuestionTagsDto: UpdateQuestionTagsDto) {
    try {
      const tags = await Promise.all(updateQuestionTagsDto.tagsUuids.map(async tag =>
        await this.tagsService.getTagById(tag)
      ));
      const question = await this.getQuestionByUuid(updateQuestionTagsDto.uuid);
      question.tags = tags;
      await this.questionsRepository.save(question);
      return updateQuestionTagsDto;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }
}
