import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UpdateProfileInput } from '../../graphql.schema';
import { IDatasource } from '../../datasources/datasource.interface';
import { VolunteerDto } from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';
import { UseGuards } from '@nestjs/common';
import { Auth0Guard } from '../../guards/auth0/auth0.guard';
import { CurrentUser } from '../../decorators/current-user';
import { Auth0Payload } from '../../interfaces/auth0.payload';

@Resolver()
export class UpdateProfileResolver {
  @Mutation('updateProfile')
  @UseGuards(Auth0Guard)
  async updateProfile(
    @Args('input') input: UpdateProfileInput,
    @Context('dataSources') dataSources: IDatasource,
    @CurrentUser() currentUser: Auth0Payload,
  ): Promise<VolunteerDto | undefined> {
    return dataSources.volunteer.updateProfile(input.volunteerId, input);
  }
}
