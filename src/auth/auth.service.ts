import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { UserDto } from "../users/dto/user.dto";
import * as bcrypt from "bcrypt";
import { AuthDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(userDto: AuthDto) {
    const [user] = await this.userService.getUserByEmail(userDto);
    if (user) {
      const isValid = await this.validateUser(userDto.password, user.password);
      if (isValid) return this.generateToken(userDto);
    }
    throw new HttpException("There is no users found with such credentials", HttpStatus.NOT_FOUND);
  }

  async signUp(userDto: AuthDto) {
    const [user] = await this.userService.getUserByEmail(userDto);
    if (!user) {
      const hashPassword = await bcrypt.hash(userDto.password, 5)
      const userData: UserDto = await this.userService.createUser({...userDto, password: hashPassword})
      return this.generateToken(userData);
    }
    throw new HttpException("This email is used in another account", HttpStatus.BAD_REQUEST);
  }

  private async validateUser(passwordFromRequest, passwordFromDB) {
    return bcrypt.compare(passwordFromRequest, passwordFromDB)
  }

  private async generateToken(userData: AuthDto) {
    console.log(userData)
    return { token: this.jwtService.sign({
        email: userData.email,
      }) };
  }
}
