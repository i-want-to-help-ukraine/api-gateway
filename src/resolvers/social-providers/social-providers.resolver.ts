import { Context, Query, Resolver } from '@nestjs/graphql';
import { IDatasource } from '../../datasources/datasource.interface';
import { SocialProvider } from '../../graphql.schema';

@Resolver()
export class SocialProvidersResolver {
  @Query('socialProviders')
  async socialProviders(
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<SocialProvider[]> {
    return dataSources.volunteer.getSocialProviders();
  }
}
