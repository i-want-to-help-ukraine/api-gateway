import { Context, Query, Resolver } from '@nestjs/graphql';
import { IDatasource } from '../../datasources/datasource.interface';
import { City } from '../../graphql.schema';

@Resolver()
export class CitiesResolver {
  @Query('cities')
  async cities(
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<City[]> {
    return dataSources.volunteer.getCities();
  }
}
