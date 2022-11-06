import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "@Users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { AuthDto } from "@Auth/dto/auth.dto";
import { UsersEntity } from "@Users/users.entity";
import { DataSource, Repository } from "typeorm";
import { SessionsEntity } from "./auth.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(SessionsEntity)
    private sessionRepository: Repository<SessionsEntity>,
    private userService: UsersService,
    private jwtService: JwtService,
    private dataSource: DataSource
  ) {}

  async signIn(userDto: AuthDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = await this.userService.getUserByEmail(userDto);
      if (user) {
        const isValid = await this.validateUser(userDto.password, user.password);
        if (isValid) {
          const token = await this.generateToken(user);
          const userSessionEntity = new SessionsEntity();
          userSessionEntity.token = token;
          userSessionEntity.user = user;
          await queryRunner.manager.save(userSessionEntity);
          await queryRunner.commitTransaction();
          return { token };
        }
        throw new HttpException("There is no users found with such credentials", HttpStatus.NOT_FOUND);
      }
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(e.message, HttpStatus.BAD_GATEWAY);
    } finally {
      await queryRunner.release();
    }
    throw new HttpException("There is no users found with such credentials", HttpStatus.NOT_FOUND);
  }

  async signUp(userDto: AuthDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = await this.userService.getUserByEmail(userDto);
      if (!user) {
        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.userService.createUser({...userDto, password: hashPassword})
        const token = await this.generateToken(user);
        const userSessionEntity = new SessionsEntity();
        userSessionEntity.token = token;
        userSessionEntity.user = user;
        await queryRunner.manager.save(userSessionEntity);
        await queryRunner.commitTransaction();
        return { token };
      }
      throw new HttpException("This email is used in another account", HttpStatus.BAD_REQUEST);
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new HttpException("This email is used in another account", HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }

  private async validateUser(passwordFromRequest, passwordFromDB) {
    return bcrypt.compare(passwordFromRequest, passwordFromDB)
  }

  private async generateToken(userData: UsersEntity) {
    return this.jwtService.sign({
      email: userData.email,
      role: userData.role,
      uuid: userData.uuid
    });
  }

  async checkSession (token: string) {
    try {
      return this.sessionRepository.findOne({ where: { token } });
    } catch {
      throw new HttpException("Something went wrong", HttpStatus.BAD_REQUEST);
    }
  }

  async logOut (token: string) {
    try {
      const session = await this.sessionRepository.findOneBy({ token });
      return await this.sessionRepository.remove(session);
    } catch (e) {
      throw new HttpException("Session not found", HttpStatus.NOT_FOUND)
    }
  }
}