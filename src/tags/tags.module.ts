import { Module } from "@nestjs/common";
import { TagsController } from "@Tags/tags.controller";
import { TagsService } from "@Tags/tags.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TagsEntity } from "@Tags/tags.entity";
import { AuthModule } from "@Auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([TagsEntity]), AuthModule],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService]
})
export class TagsModule {}
