import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BackofficeAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException();
    }

    try {
      const token = authHeader.replace('Bearer ', '');
      request.userAuth = this.jwtService.verify(token, {
        secret: this.configService.get('BACKOFFICE_AUTH_SECRET'),
      });
    } catch (e) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
