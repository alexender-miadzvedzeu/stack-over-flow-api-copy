import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { DataSource } from "typeorm";
import { UsersEntity } from "./users/users.entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configModule: ConfigService) => ({
        type: "postgres",
        port: configModule.get("DATABASE_PORT"),
        host: configModule.get("DATABASE_HOST"),
        username: configModule.get("DATABASE_USER_NAME"),
        password: configModule.get("DATABASE_PASSWORD"),
        database: configModule.get("DATABASE_NAME"),
        synchronize: true,
        entities: [UsersEntity],
      }),
    }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
