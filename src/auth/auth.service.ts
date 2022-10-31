import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { AuthDto } from "./dto/auth.dto";
import { UsersEntity } from "../users/users.entity";

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
      if (isValid) return this.generateToken(user);
    }
    throw new HttpException("There is no users found with such credentials", HttpStatus.NOT_FOUND);
  }

  async signUp(userDto: AuthDto) {
    const [user] = await this.userService.getUserByEmail(userDto);
    if (!user) {
      const hashPassword = await bcrypt.hash(userDto.password, 5)
      const userData = await this.userService.createUser({...userDto, password: hashPassword})
      delete userData.password;
      return this.generateToken(userData);
    }
    throw new HttpException("This email is used in another account", HttpStatus.BAD_REQUEST);
  }

  private async validateUser(passwordFromRequest, passwordFromDB) {
    return bcrypt.compare(passwordFromRequest, passwordFromDB)
  }

  private async generateToken(userData: UsersEntity) {
    console.log(userData)
    return { token: this.jwtService.sign({
        email: userData.email,
        role: userData.role
      }) };
  }
}
