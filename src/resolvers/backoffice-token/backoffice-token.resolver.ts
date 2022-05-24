import { Args, Query, Resolver } from '@nestjs/graphql';
import { BackofficeAuthService } from '../../services/backoffice-auth/backoffice-auth.service';
import { UseGuards } from '@nestjs/common';
import { BackofficeUserGuard } from '../../guards/backoffice-user/backoffice-user.guard';

@Resolver()
export class BackofficeTokenResolver {
  constructor(private backofficeAuthService: BackofficeAuthService) {}

  @Query('backofficeToken')
  @UseGuards(BackofficeUserGuard)
  async backofficeToken(@Args('backofficeAuthId') backofficeAuthId: string) {
    const token = this.backofficeAuthService.getToken(backofficeAuthId);

    return {
      token,
    };
  }
}
