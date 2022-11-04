import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TagsService } from "./tags.service";
import { TagsEntity } from "./tags.entity";
import { TagDto } from "./dto/tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesAuthGuard } from "../auth/roles-auth.guard";

@ApiTags("Tags")
@ApiHeader({
  name: "Authorization",
  description: "Bearer {token}",
  required: true,
})

@Roles("admin")
@UseGuards(RolesAuthGuard)
@Controller("/api/tags")
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiOperation({ summary: "Get all tags" })
  @ApiResponse({ status: 200, type: [TagsEntity] })
  @Get()
  getAllTags() {
    return this.tagsService.getAllTags()
  }

  @ApiOperation({ summary: "Create new tag" })
  @ApiResponse({ status: 200, type: "string", description: "Tag uuid" })
  @Post()
  createTag(@Body() tagDto: TagDto) {
    return this.tagsService.createTag(tagDto)
  }

  @ApiOperation({ summary: "Update tag" })
  @ApiResponse({ status: 200, type: "string", description: "Tag uuid" })
  @Put()
  updateTag(@Body() tagDto: UpdateTagDto) {
    return this.tagsService.updateTag(tagDto)
  }

  @ApiOperation({ summary: "Delete tag" })
  @ApiResponse({ status: 200, type: "string", description: "Tag uuid" })
  @ApiQuery({
    name: "uuid",
    description: "6daa08e0-3831-4e3f-8d5a-95cb47e75da9",
    required: true,
  })
  @Delete()
  deleteTag(@Query("uuid") uuid: string) {
    return this.tagsService.deleteTag(uuid);
  }
}
