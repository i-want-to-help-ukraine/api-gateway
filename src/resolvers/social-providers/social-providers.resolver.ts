import { Context, Query, Resolver } from '@nestjs/graphql';
import { IDatasource } from '../../datasources/datasource.interface';
import { SocialProvider } from '../../graphql.schema';

@Resolver('SocialProviders')
export class SocialProvidersResolver {
  @Query()
  async socialProviders(
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<SocialProvider[]> {
    return dataSources.volunteer.getSocialProviders();
  }
}
