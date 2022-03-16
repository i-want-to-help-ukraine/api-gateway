import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Auth0Service } from '../../services/auth0/auth0.service';

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

    const token = authHeader.replace('Bearer ', '');
    const isAuthenticated = await this.auth0.isAuthenticated(token);

    if (!isAuthenticated) {
      throw new UnauthorizedException();
    }

    request.userAuth = {
      authId: token,
    };

    return true;
  }
}
