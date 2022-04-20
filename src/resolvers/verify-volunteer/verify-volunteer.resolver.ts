import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { VolunteerDto } from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';
import { IDatasource } from '../../datasources/datasource.interface';

@Resolver()
export class VerifyVolunteerResolver {
  @Mutation('verifyVolunteer')
  async verifyVolunteer(
    @Args('id') id: string,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<VolunteerDto | undefined> {
    console.log('id', id);
    return dataSources.volunteer.verifyVolunteer(id);
  }
}
