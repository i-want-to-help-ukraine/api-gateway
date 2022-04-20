import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IDatasource } from '../../datasources/datasource.interface';
import { VolunteerDto } from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';

@Resolver()
export class RejectVolunteerResolver {
  @Mutation('rejectVolunteer')
  async rejectVolunteer(
    @Args('id') id: string,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<VolunteerDto | undefined> {
    return dataSources.volunteer.rejectVolunteer(id);
  }
}
