import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IDatasource } from '../../datasources/datasource.interface';
import { CreateVolunteerInput } from '../../graphql.schema';
import { VolunteerDto } from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';

@Resolver()
export class CreateVolunteerResolver {
  @Mutation('createVolunteer')
  async createVolunteer(
    @Args('input') input: CreateVolunteerInput,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<VolunteerDto | undefined> {
    return dataSources.volunteer.createVolunteer(input);
  }
}
