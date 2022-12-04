import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "@Users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { AuthDto } from "@Auth/dto/auth.dto";
import { DataSource, Repository } from "typeorm";
import { SessionsEntity } from "./auth.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { GenerateUserTokenDtoDto } from "../users/dto/generate-user-token.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(SessionsEntity)
    private sessionRepository: Repository<SessionsEntity>,
    private userService: UsersService,
    private jwtService: JwtService,
    private dataSource: DataSource,
    private configService: ConfigService,
  ) {}

  async signIn(userDto: AuthDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = await this.userService.getUserByEmail(userDto);
      if (user) {
        const userSessionEntity = new SessionsEntity();
        userSessionEntity.user = user;
        const { uuid } = await queryRunner.manager.save(userSessionEntity);
        const { access_token, refresh_token } = await this.getTokens({
          ...user,
          sessionUuid: uuid,
        });
        await queryRunner.commitTransaction();
        return { access_token, refresh_token };
      }
      throw new HttpException(
        "There is no users found with such credentials",
        HttpStatus.NOT_FOUND,
      );
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(e.message, HttpStatus.BAD_GATEWAY);
    } finally {
      await queryRunner.release();
    }
  }

  async signUp(userDto: AuthDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = await this.userService.getUserByEmail(userDto);
      if (!user) {
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({
          ...userDto,
          password: hashPassword,
        });
        const userSessionEntity = new SessionsEntity();
        userSessionEntity.user = user;
        const { uuid } = await queryRunner.manager.save(userSessionEntity);
        const { access_token, refresh_token } = await this.getTokens({
          ...user,
          sessionUuid: uuid,
        });
        await queryRunner.commitTransaction();
        return { access_token, refresh_token };
      }
      throw new HttpException(
        "This email is used in another account",
        HttpStatus.BAD_REQUEST,
      );
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        "This email is used in another account",
        HttpStatus.BAD_REQUEST,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async validateUser(userDto: AuthDto): Promise<any> {
    const user = await this.userService.getUserByEmail(userDto);
    const isValid = await bcrypt.compare(userDto.password, user.password);
    if (isValid) return user;
    return null;
  }

  async checkSession(uuid: string) {
    try {
      return await this.sessionRepository.findOne({ where: { uuid } });
    } catch {
      throw new HttpException("Something went wrong", HttpStatus.BAD_REQUEST);
    }
  }

  async getTokens(user: GenerateUserTokenDtoDto) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          uuid: user.uuid,
          email: user.email,
          role: user.role,
          session: user.sessionUuid,
        },
        {
          secret: this.configService.get<string>("SECRET_KEY"),
          expiresIn: this.configService.get<string>("ACCESS_TOKEN_EXPIRES_IN"),
        },
      ),
      this.jwtService.signAsync(
        {
          uuid: user.uuid,
          email: user.email,
        },
        {
          secret: this.configService.get<string>("SECRET_KEY"),
          expiresIn: this.configService.get<string>("REFRESH_TOKEN_EXPIRES_IN"),
        },
      ),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }

  async logOut(payload: string) {
    try {
      const token = payload.split(" ")[1];
      const user = this.jwtService.verify(token);
      const session = await this.sessionRepository.findOneBy({
        uuid: user.session,
      });
      return await this.sessionRepository.remove(session);
    } catch (e) {
      throw new HttpException("Session not found", HttpStatus.NOT_FOUND);
    }
  }

  async refreshToken(payload: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const token = payload.split(" ")[1];
      const data = this.jwtService.verify(token);
      const user = await this.userService.getUserByEmail(data.email);
      if (user) {
        const userSessionEntity = new SessionsEntity();
        userSessionEntity.user = user;
        const { uuid } = await queryRunner.manager.save(userSessionEntity);
        const { access_token, refresh_token } = await this.getTokens({
          ...user,
          sessionUuid: uuid,
        });
        await queryRunner.commitTransaction();
        return { access_token, refresh_token };
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new UnauthorizedException();
    } finally {
      await queryRunner.release();
    }
  }
}
