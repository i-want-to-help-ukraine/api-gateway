import { Context, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../decorators/current-user';
import { Auth0Payload } from '../../interfaces/auth0.payload';
import { IDatasource } from '../../datasources/datasource.interface';
import { Auth0Guard } from '../../guards/auth0/auth0.guard';
import { VolunteerDto } from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';

@Resolver('Profile')
export class ProfileResolver {
  @Query()
  @UseGuards(Auth0Guard)
  profile(
    @CurrentUser() currentUser: Auth0Payload,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<VolunteerDto | undefined> {
    return dataSources.volunteer.getVolunteerProfile(currentUser.sub);
  }
}
