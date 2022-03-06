import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { IDatasource } from '../../datasources/datasource.interface';
import { SearchRequest, Volunteer } from '../../graphql.schema';

@Resolver('SearchVolunteers')
export class SearchVolunteersResolver {
  @Query('searchVolunteers')
  async searchVolunteers(
    @Args('request') request: SearchRequest,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<Volunteer[] | null> {
    const searchRequest: SearchRequest = {
      city: 'kyiv',
      activityTypes: [],
      donateOptions: [],
    };

    return dataSources.volunteer.searchVolunteers(request);
  }
}
