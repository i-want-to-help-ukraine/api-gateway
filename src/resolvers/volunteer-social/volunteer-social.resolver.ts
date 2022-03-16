import {
  Args,
  Context,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { VolunteerByIdInput, VolunteerSocial } from '../../graphql.schema';
import { IDatasource } from '../../datasources/datasource.interface';

@Resolver('VolunteerSocial')
export class VolunteerSocialResolver {
  @Query()
  async volunteerSocial(
    @Args('input') input: VolunteerByIdInput,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<(VolunteerSocial | Error | null)[]> {
    return dataSources.volunteer.getVolunteerSocial([input.id]);
  }

  @ResolveField('provider')
  async provider(
    @Parent() volunteerSocial: VolunteerSocial,
    @Context('dataSources') dataSources: IDatasource,
  ) {
    return dataSources.volunteer.getSocialProvider(volunteerSocial.providerId);
  }
}
