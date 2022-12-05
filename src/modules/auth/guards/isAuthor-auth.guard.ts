import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { DataSource } from "typeorm";
import { REPOSITORY_KEY } from "@/modules/auth/decorators/repository.decorator";
import { EntityTarget } from "typeorm/common/EntityTarget";

@Injectable()
export class IsAuthorAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private dataSource: DataSource,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const entity: EntityTarget<any> = this.reflector.getAllAndOverride(REPOSITORY_KEY, [
        context.getHandler(),
        context.getClass()
      ]);
      const request = context.switchToHttp().getRequest();
      const contentUuid = request?.body?.uuid || request?.query?.uuid;
      const userUuid = request?.user?.uuid;
      const role = request?.user?.role?.value;
      if (role === "admin") return true;
      const repo = this.dataSource.getRepository(entity);
      const data = await repo.find({ where: { author: { uuid: userUuid }}})
      return data.some(q => q.uuid === contentUuid);
    } catch (e) {
      throw new UnauthorizedException()
    }
  }
}