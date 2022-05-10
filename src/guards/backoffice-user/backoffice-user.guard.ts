import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
import { BackofficeAuthService } from '../../services/backoffice-auth/backoffice-auth.service';

@Injectable()
export class BackofficeUserGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private backofficeService: BackofficeAuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { input } = ctx.getArgs();

    const user = await this.backofficeService.getUser(input);

    if (user === undefined) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
