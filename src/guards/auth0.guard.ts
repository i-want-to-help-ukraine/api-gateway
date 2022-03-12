import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Auth0Service } from '../services/auth0/auth0.service';

@Injectable()
export class Auth0Guard implements CanActivate {
  constructor(private auth0: Auth0Service) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException();
    }

    try {
      const token = authHeader.replace('Bearer ', '');
      request.userAuth = await this.auth0.isAuthenticated(token);
      request.auth0Id = (await this.auth0.getUserProfile(token)).id;
    } catch (e) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
