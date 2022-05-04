import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { IDatasource } from '../../datasources/datasource.interface';
import { VolunteerByIdInput } from '../../graphql.schema';

@Resolver('VolunteerReport')
export class VolunteerReportResolver {
  @Query()
  volunteerReport(
    @Args('input') input: VolunteerByIdInput,
    @Context('dataSources') dataSources: IDatasource,
  ) {
    return dataSources.report.getVolunteerReports([input.id]);
  }
}
