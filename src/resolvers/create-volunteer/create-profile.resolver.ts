import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IDatasource } from '../../datasources/datasource.interface';
import { VolunteerDto } from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';
import { CreateProfileInput } from '../../graphql.schema';

@Resolver()
export class CreateProfileResolver {
  @Mutation('createProfile')
  async createProfile(
    @Args('input') input: CreateProfileInput,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<VolunteerDto | undefined> {
    return dataSources.volunteer.createVolunteer(input);
  }
}
