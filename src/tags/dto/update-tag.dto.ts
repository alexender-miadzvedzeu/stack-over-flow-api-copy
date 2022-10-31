import { ApiProperty } from "@nestjs/swagger";

export class UpdateTagDto {
  @ApiProperty({ example: "uuid", description: "Tag uuid" })
  readonly uuid: string;
  @ApiProperty({ example: "tag", description: "New tag" })
  readonly tag: string;
}
