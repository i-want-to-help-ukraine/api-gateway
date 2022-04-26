import { Context, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../decorators/current-user';
import { AuthPayload } from '../../interfaces/authPayload';
import { IDatasource } from '../../datasources/datasource.interface';
import { VolunteerDto } from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';
import { AuthGuard } from '../../guards/auth/auth-guard.service';

@Resolver('Profile')
export class ProfileResolver {
  @Query()
  @UseGuards(AuthGuard)
  profile(
    @CurrentUser() currentUser: AuthPayload,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<VolunteerDto | undefined> {
    return dataSources.volunteer.getVolunteerProfile(currentUser.sub);
  }
}
