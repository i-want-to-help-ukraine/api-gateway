import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { promisify } from 'util';
import * as jwt from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Auth0Guard implements CanActivate {
  constructor(private configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);

    try {
      await this.verify()(ctx.getContext().req, context.getArgByIndex(1));
    } catch (e) {
      throw new UnauthorizedException();
    }

    return true;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  private verify() {
    return promisify(
      jwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: this.configService.get('FIREBASE_JWK_URI') || '',
        }),
        audience: this.configService.get('FIREBASE_AUDIENCE'),
        issuer: this.configService.get('FIREBASE_ISSUER'),
        algorithms: ['RS256'],
      }),
    );
  }
}
