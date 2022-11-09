import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "@Users/users.module";
import { DataSource } from "typeorm";
import { RoleModule } from "@Role/role.module";
import { RoleEntity } from "@Role/role.entity";
import { AuthModule } from "@Auth/auth.module";
import { UsersEntity } from "@Users/users.entity";
import { QuestionsModule } from "@Questions/questions.module";
import { QuestionsEntity } from "@Questions/questions.entity";
import { TagsModule } from "@Tags/tags.module";
import { TagsEntity } from "@Tags/tags.entity";
import { AnswersModule } from "@Answers/answers.module";
import { AnswersEntity } from "@Answers/answers.entity";
import { SessionsEntity } from "@Auth/auth.entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configModule: ConfigService) => ({
        type: "postgres",
        port: configModule.get("POSTGRES_PORT"),
        host: configModule.get("POSTGRES_HOST"),
        username: configModule.get("POSTGRES_USER"),
        password: configModule.get("POSTGRES_PASSWORD"),
        database: configModule.get("POSTGRES_DB"),
        synchronize: process.env.NODE_ENV !== "production",
        entities: [
          UsersEntity,
          RoleEntity,
          QuestionsEntity,
          TagsEntity,
          AnswersEntity,
          SessionsEntity,
        ],
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
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
