import { ApiProperty } from "@nestjs/swagger";

export class UpdateQuestionTagsDto {
  @ApiProperty({title: "uuid", description: "Question uuid", required: true})
  public readonly uuid: string;
  @ApiProperty({title: "tags", description: "Question tags", example: [ "dfdd05de-8c15-4523-a475-76e2bc0fae49", "dfdd05de-8c15-4523-a475-76e2bc0fae49", "dfdd05de-8c15-4523-a475-76e2bc0fae49" ], required: true})
  public readonly tagsUuids: string[];
}