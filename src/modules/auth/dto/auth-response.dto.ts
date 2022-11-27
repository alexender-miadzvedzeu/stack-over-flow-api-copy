import { ApiProperty } from "@nestjs/swagger";

export class AuthResponseDto {
  @ApiProperty({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJ1dWlkIjoiYzZmMDEwZDItNWRjNi00OTEzLTkxMDMtNWQ1ODE5ODNkNWQ2IiwiaWF0IjoxNjY2NzA1Njc2LCJleHAiOjE2NjY3OTIwNzZ9.3IDC2_4SIvDZZZWlxS9pfHbKWZYY_9cXgTE-3UqMgg" })
  readonly token: string;
}