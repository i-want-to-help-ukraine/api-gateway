import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth/auth-guard.service';
import { UpdateProfileV2Input } from '../../graphql.schema';
import { IDatasource } from '../../datasources/datasource.interface';
import { CurrentUser } from '../../decorators/current-user';
import { AuthPayload } from '../../interfaces/authPayload';
import { VolunteerDto } from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';

@Resolver()
export class UpdateProfileV2Resolver {
  @Mutation('updateProfileV2')
  @UseGuards(AuthGuard)
  async updateProfileV2(
    @Args('input') input: UpdateProfileV2Input,
    @Context('dataSources') dataSources: IDatasource,
    @CurrentUser() currentUser: AuthPayload,
  ): Promise<VolunteerDto | undefined> {
    return dataSources.volunteer.updateProfileV2(currentUser.sub, input);
  }
}
