import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { SearchInput } from '../../graphql.schema';
import { IDatasource } from '../../datasources/datasource.interface';

@Resolver('VolunteersSearch')
export class VolunteersSearchResolver {
  @Query()
  async volunteersSearch(
    @Args('input') input: SearchInput,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<any[]> {
    return dataSources.volunteer.searchVolunteers(input);
  }
}
