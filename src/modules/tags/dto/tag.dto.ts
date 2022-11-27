import { ApiProperty } from "@nestjs/swagger";

export class TagDto {
  @ApiProperty({ example: "Tag", description: "Question tag" })
  readonly tag: string;
}
