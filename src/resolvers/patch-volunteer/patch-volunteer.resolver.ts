import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IDatasource } from '../../datasources/datasource.interface';
import { VolunteerDto } from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';
import { UpdateProfileInput } from '../../graphql.schema';

@Resolver()
export class PatchVolunteerResolver {
  @Mutation('patchVolunteer')
  async patchVolunteer(
    @Args('id') id: string,
    @Args('input') input: UpdateProfileInput,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<VolunteerDto | undefined> {
    return dataSources.volunteer.patchVolunteer(id, input);
  }
}
