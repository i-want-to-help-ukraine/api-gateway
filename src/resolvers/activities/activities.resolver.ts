import { Context, Query, Resolver } from '@nestjs/graphql';
import { IDatasource } from '../../datasources/datasource.interface';
import { VolunteerActivity } from '../../graphql.schema';

@Resolver()
export class ActivitiesResolver {
  @Query('activities')
  async activities(
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<VolunteerActivity[]> {
    const activities = await dataSources.volunteer.getActivities();

    return activities.map((activity) => ({
      id: activity.id,
      title: activity.title,
    }));
  }
}
