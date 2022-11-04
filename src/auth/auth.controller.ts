import { Body, Controller, Delete, Post, Headers, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthDto } from "./dto/auth.dto";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { AuthLogOutDto } from "./dto/auth-log-out.dto";
import { Roles } from "./roles-auth.decorator";
import { RolesAuthGuard } from "./roles-auth.guard";

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
}
