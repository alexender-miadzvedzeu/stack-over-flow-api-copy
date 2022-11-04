import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles-auth.decorator";
import { AuthService } from "./auth.service";


@Injectable()
export class RolesAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private authService: AuthService,
    ) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requaredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler(),
        context.getClass()
      ])
      if (!requaredRoles) return true;
      const request = context.switchToHttp().getRequest();
      const authorisationHeader = request.headers.authorization;
      const tokenType = authorisationHeader?.split(" ")[0];
      const token = authorisationHeader?.split(" ")[1];
      if (tokenType !== "Bearer" || !token) {
        throw new UnauthorizedException({ message: "Authentication failed" })
      }
      return this.authService.checkSession(token)
        .then(session => {
          if (session) {
            const user = this.jwtService.verify(token);
            request.user = user;
            return requaredRoles.some(role => role === user.role.value);
          }
          throw new UnauthorizedException({ message: "Authentication failed" })
        })
    } catch (e) {
      throw new UnauthorizedException({ message: "Authentication failed" })
    }
  }
}