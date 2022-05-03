import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UpdateProfileInput } from '../../graphql.schema';
import { IDatasource } from '../../datasources/datasource.interface';
import { VolunteerDto } from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../decorators/current-user';
import { AuthPayload } from '../../interfaces/authPayload';
import { AuthGuard } from '../../guards/auth/auth-guard.service';

@Resolver()
export class UpdateProfileResolver {
  @Mutation('updateProfile')
  @UseGuards(AuthGuard)
  async updateProfile(
    @Args('input') input: UpdateProfileInput,
    @Context('dataSources') dataSources: IDatasource,
    @CurrentUser() currentUser: AuthPayload,
  ): Promise<VolunteerDto | undefined> {
    return dataSources.volunteer.updateProfile(currentUser.sub, input);
  }
}
