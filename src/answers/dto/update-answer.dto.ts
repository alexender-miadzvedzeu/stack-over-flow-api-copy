import { ApiProperty } from "@nestjs/swagger";
import { AnswerDto } from "@Answers/dto/answer.dto";

export class UpdateAnswerDto extends AnswerDto{
  @ApiProperty({title: "uuid", description: "Answer uuid", required: true, example: "58c746d5-25cb-4b8f-9c6c-771ed32e1499"})
  public readonly uuid: string;
  @ApiProperty({title: "rating", description: "Answer rating", required: false, example: "inc | decr"})
  public readonly rating: "inc" | "decr";
}