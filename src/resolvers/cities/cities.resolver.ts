import { Context, Query, Resolver } from '@nestjs/graphql';
import { IDatasource } from '../../datasources/datasource.interface';

@Resolver()
export class CitiesResolver {
  @Query('cities')
  async cities(@Context('dataSources') dataSources: IDatasource): Promise<any> {
    return dataSources.volunteer.getCities();
  }
}
