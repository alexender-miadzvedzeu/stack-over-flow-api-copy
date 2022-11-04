import { ApiProperty } from "@nestjs/swagger";

export class AuthLogOutDto {
  @ApiProperty({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOnsidXVpZCI6IjZhZjYwNjU0LWMzZTYtNDI2ZC04Yjc0LWEzNDc0NDdkOWJjYSIsImNyZWF0ZWRBdCI6IjIwMjItMTAtMjdUMTA6MzI6MjguMjUwWiIsInVwZGF0ZWRBdCI6IjIwMjItMTAtMjdUMTA6MzI6MjguMjUwWiIsInZhbHVlIjoiYWRtaW4iLCJkZXNjcmlwdGlvbiI6IlByb3ZpZGVzIHRvIHVwZGF0ZSBhbmQgZGVsZXRlIGFueSBxdWVzdGlvbnMgYW5kIHRhZ3MifSwidXVpZCI6IjEyZjFkOTgxLTU2MTUtNDA0OC05YmYyLTI3OTMwYzIxMmM5MSIsImlhdCI6MTY2NzU2MDUwOSwiZXhwIjoxNjY3NjQ2OTA5fQ.mC_XKdxiNCoSPra7UgSFMn5oeXvrxtHWuUrvlJ6m4ak", description: "User auth token" })
  readonly token: string;
}