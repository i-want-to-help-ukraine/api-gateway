import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AddReportInput, VolunteerReport } from '../../graphql.schema';
import { IDatasource } from '../../datasources/datasource.interface';
import { CurrentUser } from '../../decorators/current-user';
import { AuthPayload } from '../../interfaces/authPayload';

@Resolver()
export class AddReportResolver {
  @Mutation('addReport')
  addReport(
    @Args('input') input: AddReportInput,
    @CurrentUser() currentUser: AuthPayload,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<VolunteerReport[]> {
    return dataSources.report.addReport(input, currentUser.sub);
  }
}
