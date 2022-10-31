import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TagsEntity } from "./tags.entity";
import { TagDto } from "./dto/tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagsEntity)
    private tagsRepository: Repository<TagsEntity>
  ) {}

  async getAllTags () {
    try {
      return await this.tagsRepository.find();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  async createTag (tagDto: TagDto) {
    try {
      return await this.tagsRepository.save(tagDto);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  async updateTag (tagDto: UpdateTagDto ) {
    try {
      return await this.tagsRepository.update(tagDto.uuid, { tag: tagDto.tag });
    } catch (e) {
      console.log(e)
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }

  async deleteTag (uuid: string ) {
    try {
      return await this.tagsRepository.delete(uuid);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }
}
