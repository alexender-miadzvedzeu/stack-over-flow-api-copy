import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "@Users/users.module";
import { DataSource } from "typeorm";
import { RoleModule } from "@Role/role.module";
import { AuthModule } from "@Auth/auth.module";
import { QuestionsModule } from "@Questions/questions.module";
import { TagsModule } from "@Tags/tags.module";
import { AnswersModule } from "@/modules/answers/answers.module";
import { dataSourceOptions } from "./config/data-sourse-options.config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => dataSourceOptions,
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
