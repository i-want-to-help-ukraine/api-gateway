import { Context, Parent, Query, Resolver } from '@nestjs/graphql';
import { IDatasource } from '../../datasources/datasource.interface';
import { VolunteerSocialDto } from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';

@Resolver('SocialProvider')
export class SocialProviderResolver {
  @Query()
  async socialProvider(
    @Parent() volunteerSocial: VolunteerSocialDto,
    @Context('dataSources') dataSources: IDatasource,
  ) {
    return dataSources.volunteer.getSocialProviders([
      volunteerSocial.providerId,
    ]);
  }
}
