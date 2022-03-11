import { Context, Query, Resolver } from '@nestjs/graphql';
import { IDatasource } from '../../datasources/datasource.interface';
import { ActivityDto } from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';

@Resolver()
export class ActivitiesResolver {
  @Query('activities')
  async activities(
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<(ActivityDto | Error | null)[]> {
    return dataSources.volunteer.getActivities([]);
  }
}
