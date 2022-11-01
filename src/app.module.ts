import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { DataSource } from "typeorm";
import { RoleModule } from "./role/role.module";
import { RoleEntity } from "./role/role.entity";
import { AuthModule } from "./auth/auth.module";
import { UsersEntity } from "./users/users.entity";
import { QuestionsModule } from "./questions/questions.module";
import { QuestionsEntity } from "./questions/questions.entity";
import { TagsModule } from "./tags/tags.module";
import { TagsEntity } from "./tags/tags.entity";
import { AnswersModule } from "./answers/answers.module";
import { AnswersEntity } from "./answers/answers.entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configModule: ConfigService) => ({
        type: "postgres",
        port: configModule.get("POSTGRES_PORT"),
        host: configModule.get("POSTGRES_HOST"),
        username: configModule.get("POSTGRES_USER_NAME"),
        password: configModule.get("POSTGRES_PASSWORD"),
        database: configModule.get("POSTGRES_NAME"),
        synchronize: process.env.NODE_ENV !== "production",
        entities: [
          UsersEntity,
          RoleEntity,
          QuestionsEntity,
          TagsEntity,
          AnswersEntity,
        ],
      }),
    }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: `.env.${process.env.NODE_ENV}` }),
    UsersModule,
    RoleModule,
    AuthModule,
    QuestionsModule,
    TagsModule,
    AnswersModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
