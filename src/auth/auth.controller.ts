import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthDto } from "./dto/auth.dto";
import { AuthResponseDto } from "./dto/auth-response.dto";

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
}
