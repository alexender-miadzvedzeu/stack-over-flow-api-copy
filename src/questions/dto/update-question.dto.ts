import { ApiProperty } from "@nestjs/swagger";

export class UpdateQuestionDto {
  @ApiProperty({title: "uuid", description: "Question uuid", required: true})
  private readonly uuid: string;
  @ApiProperty({title: "title", description: "Question title", required: true})
  private readonly title: string;
  @ApiProperty({title: "rating", description: "Question rating", required: true})
  private readonly rating: number;
  @ApiProperty({title: "description", description: "Question description", required: true})
  private readonly description: string;
  @ApiProperty({title: "tags", description: "Question tags"})
  private readonly tags: string[];
}