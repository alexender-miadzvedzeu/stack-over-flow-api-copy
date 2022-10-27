import { ApiProperty } from "@nestjs/swagger";

export class QuestionDto {
  @ApiProperty({title: "title", description: "Question title", required: true})
  private readonly title: string;
  @ApiProperty({title: "rating", description: "Question rating", required: true})
  private readonly rating: number;
  @ApiProperty({title: "author", description: "Question author", required: true})
  private readonly author: string
  @ApiProperty({title: "description", description: "Question description", required: true})
  private readonly description: string;
  @ApiProperty({title: "tags", description: "Question tags"})
  private readonly tags: string[];
}