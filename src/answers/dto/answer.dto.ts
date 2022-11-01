import { ApiProperty } from "@nestjs/swagger";

export class AnswerDto {
  @ApiProperty({ example: "58c746d5-25cb-4b8f-9c6c-771ed32e1499", description: "Question uuid" })
  public questionUuid: string
  @ApiProperty({ example: "Some text...", description: "Answer description" })
  public description: string
}