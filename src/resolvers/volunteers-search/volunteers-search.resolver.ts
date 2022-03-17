import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { SearchInput, VolunteerSearchResponse } from '../../graphql.schema';
import { IDatasource } from '../../datasources/datasource.interface';

@Resolver('VolunteersSearch')
export class VolunteersSearchResolver {
  @Query()
  async volunteersSearch(
    @Args('input') input: SearchInput,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<VolunteerSearchResponse> {
    return dataSources.volunteer.searchVolunteers(input);
  }
}
