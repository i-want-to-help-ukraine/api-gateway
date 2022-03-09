import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IDatasource } from '../../datasources/datasource.interface';
import { CreateVolunteerInput } from '../../graphql.schema';

@Resolver()
export class CreateVolunteerResolver {
  @Mutation('createVolunteer')
  async createVolunteer(
    @Args('input') input: CreateVolunteerInput,
    @Context('dataSources') dataSources: IDatasource,
  ) {
    return dataSources.volunteer.createVolunteer(input);
  }
}
