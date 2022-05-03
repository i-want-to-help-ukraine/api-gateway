import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { HideProfileInput } from '../../graphql.schema';
import { IDatasource } from '../../datasources/datasource.interface';
import { VolunteerDto } from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';
import { CurrentUser } from '../../decorators/current-user';
import { AuthPayload } from '../../interfaces/authPayload';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth/auth-guard.service';

@Resolver()
export class HideProfileResolver {
  @Mutation('hideProfile')
  @UseGuards(AuthGuard)
  async hideProfile(
    @Args('input') input: HideProfileInput,
    @Context('dataSources') dataSources: IDatasource,
    @CurrentUser() currentUser: AuthPayload,
  ): Promise<VolunteerDto | undefined> {
    return dataSources.volunteer.hideProfile(currentUser.sub);
  }
}
