import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { IDatasource } from '../../datasources/datasource.interface';
import { GetReportRequest, VolunteerReport } from '../../graphql.schema';

@Resolver()
export class GetReportsResolver {
  @Query('getReports')
  getReports(
    @Args('input') input: GetReportRequest,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<VolunteerReport[]> {
    return dataSources.report.getReports(input);
  }
}
