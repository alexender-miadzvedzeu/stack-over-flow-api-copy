import { ApiProperty } from "@nestjs/swagger";

export class UpdateQuestionDto {
  @ApiProperty({title: "uuid", description: "Question uuid", required: true})
  public readonly uuid: string;
  @ApiProperty({title: "title", description: "Question title", required: true})
  public readonly title: string;
  @ApiProperty({title: "rating", description: "Question rating", required: false, example: "inc | decr"})
  public readonly rating: "inc" | "decr";
  @ApiProperty({title: "description", description: "Question description", required: true})
  public readonly description: string;
}