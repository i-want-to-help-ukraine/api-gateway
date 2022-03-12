import { Context, Query, Resolver } from '@nestjs/graphql';
import { IDatasource } from '../../datasources/datasource.interface';

@Resolver('SocialProviders')
export class SocialProvidersResolver {
  @Query()
  async socialProviders(@Context('dataSources') dataSources: IDatasource) {
    return dataSources.volunteer.getSocialProviders([]);
  }
}
