import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IDatasource } from '../../datasources/datasource.interface';
import { VolunteerDto } from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';
import { CreateProfileInput } from '../../graphql.schema';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../decorators/current-user';
import { Auth0Payload } from '../../interfaces/auth0.payload';
import { AuthGuard } from '../../guards/auth/auth-guard.service';

@Resolver()
export class CreateProfileResolver {
  @Mutation('createProfile')
  @UseGuards(AuthGuard)
  async createProfile(
    @Args('input') input: CreateProfileInput,
    @Context('dataSources') dataSources: IDatasource,
    @CurrentUser() currentUser: Auth0Payload,
  ): Promise<VolunteerDto | undefined> {
    return dataSources.volunteer.createVolunteer(currentUser.sub, input);
  }
}
