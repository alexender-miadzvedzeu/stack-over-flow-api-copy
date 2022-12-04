import { Body, Controller, Delete, Post, Headers, UseGuards, Get } from "@nestjs/common";
import { AuthService } from "@Auth/auth.service";
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthDto } from "@Auth/dto/auth.dto";
import { AuthResponseDto } from "@Auth/dto/auth-response.dto";
import { Roles } from "@Auth/decorators/roles-auth.decorator";
import { RolesAuthGuard } from "@Auth/guards/roles-auth.guard";

@ApiTags("Auth")
@Controller("/api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Sign-in" })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @Post("/sign-in")
  async signIn(@Body() userDto: AuthDto) {
    return this.authService.signIn(userDto);
  }

  @ApiOperation({ summary: "Sign-in" })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @Post("/sign-up")
  async signUp(@Body() userDto: AuthDto) {
    return this.authService.signUp(userDto);
  }

  @Roles("user", "admin")
  @UseGuards(RolesAuthGuard)
  @ApiOperation({ summary: "Log-out" })
  @ApiResponse({ status: 200 })
  @Delete("/log-out")
  async logOut(@Headers() headers) {
    return this.authService.logOut(headers.authorization);
  }

  @ApiOperation({ summary: "Refresh-tokens" })
  @ApiResponse({ status: 200 })
  @Get("/refresh-tokens")
  @ApiHeader({
    name: "Authorization",
    description: "Bearer {refresh_token}",
    required: true,
    allowEmptyValue: false,
  })
  async refreshToken(@Headers() headers) {
    return this.authService.refreshToken(headers.authorization);
  }
}
