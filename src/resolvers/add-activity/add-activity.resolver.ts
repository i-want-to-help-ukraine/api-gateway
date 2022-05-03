import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Activity, AddActivityInput } from '../../graphql.schema';
import { IDatasource } from '../../datasources/datasource.interface';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth/auth-guard.service';

@Resolver()
export class AddActivityResolver {
  @Mutation('addActivity')
  @UseGuards(AuthGuard)
  async addActivity(
    @Args('input') input: AddActivityInput,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<Activity> {
    return dataSources.volunteer.addActivity(input);
  }
}
