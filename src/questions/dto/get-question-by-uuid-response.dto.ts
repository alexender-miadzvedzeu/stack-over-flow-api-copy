import { ApiProperty } from "@nestjs/swagger";
import { AnswersEntity } from "@Answers/answers.entity";

export class GetQuestionByUuidResponseDto {
  @ApiProperty({title: "uuid", description: "Question uuid", required: true})
  public readonly uuid: string;
  @ApiProperty({title: "title", description: "Question title", required: true})
  public readonly title: string;
  @ApiProperty({title: "description", description: "Question description", required: true})
  public readonly description: string;
  @ApiProperty({title: "rating", description: "Question rating", required: true})
  public readonly rating: number;
  @ApiProperty({title: "answers", description: "Question answers", required: true})
  public readonly answers: [AnswersEntity];
}