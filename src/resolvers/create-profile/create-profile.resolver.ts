import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IDatasource } from '../../datasources/datasource.interface';
import { VolunteerDto } from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';
import { CreateProfileInput } from '../../graphql.schema';
import { UseGuards } from '@nestjs/common';
import { Auth0Guard } from '../../guards/auth0/auth0.guard';

@Resolver()
export class CreateProfileResolver {
  @Mutation('createProfile')
  @UseGuards(Auth0Guard)
  async createProfile(
    @Args('input') input: CreateProfileInput,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<VolunteerDto | undefined> {
    return dataSources.volunteer.createVolunteer(input);
  }
}
