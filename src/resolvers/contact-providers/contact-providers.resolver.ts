import { Context, Query, Resolver } from '@nestjs/graphql';
import { IDatasource } from '../../datasources/datasource.interface';

@Resolver('ContactProviders')
export class ContactProvidersResolver {
  @Query()
  async contactProviders(@Context('dataSources') dataSources: IDatasource) {
    return dataSources.volunteer.getContactProviders([]);
  }
}
