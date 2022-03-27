import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { HideProfileInput } from '../../graphql.schema';
import { IDatasource } from '../../datasources/datasource.interface';
import { VolunteerDto } from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';
import { CurrentUser } from '../../decorators/current-user';
import { Auth0Payload } from '../../interfaces/auth0.payload';

@Resolver()
export class HideProfileResolver {
  @Mutation('hideProfile')
  async hideProfile(
    @Args('input') input: HideProfileInput,
    @Context('dataSources') dataSources: IDatasource,
    @CurrentUser() currentUser: Auth0Payload,
  ): Promise<VolunteerDto | undefined> {
    return dataSources.volunteer.hideProfile(currentUser.sub);
  }
}
