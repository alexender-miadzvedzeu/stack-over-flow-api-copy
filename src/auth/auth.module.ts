import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "@Auth/auth.service";
import { AuthController } from "@Auth/auth.controller";
import { UsersModule } from "@Users/users.module";
import { JwtModule } from "@nestjs/jwt"
import { TypeOrmModule } from "@nestjs/typeorm";
import { SessionsEntity } from "./auth.entity";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([SessionsEntity]),
    JwtModule.register({
      secret: process.env.SECRET_KEY || "secret",
      signOptions: {
        expiresIn: "24h"
      }
    })
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
