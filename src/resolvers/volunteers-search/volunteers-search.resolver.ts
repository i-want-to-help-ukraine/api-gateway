import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { SearchInput } from '../../graphql.schema';
import { IDatasource } from '../../datasources/datasource.interface';
import { VolunteerDto } from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';

@Resolver('VolunteersSearch')
export class VolunteersSearchResolver {
  @Query()
  async volunteersSearch(
    @Args('input') input: SearchInput,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<VolunteerDto[]> {
    return dataSources.volunteer.searchVolunteers(input);
  }
}
