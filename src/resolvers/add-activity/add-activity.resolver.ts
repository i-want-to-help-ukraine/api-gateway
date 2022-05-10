import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Activity, AddActivityInput } from '../../graphql.schema';
import { IDatasource } from '../../datasources/datasource.interface';
import { UseGuards } from '@nestjs/common';
import { BackofficeAuthGuard } from '../../guards/backoffice/backoffice-auth.guard';

@Resolver()
export class AddActivityResolver {
  @Mutation('addActivity')
  @UseGuards(BackofficeAuthGuard)
  async addActivity(
    @Args('input') input: AddActivityInput,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<Activity> {
    return dataSources.volunteer.addActivity(input);
  }
}
