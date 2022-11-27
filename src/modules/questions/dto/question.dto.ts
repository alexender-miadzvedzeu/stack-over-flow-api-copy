import { ApiProperty } from "@nestjs/swagger";

export class QuestionDto {
  @ApiProperty({title: "title", description: "Question title", required: true})
  readonly title: string;
  @ApiProperty({title: "description", description: "Question description", required: true})
  readonly description: string;
}