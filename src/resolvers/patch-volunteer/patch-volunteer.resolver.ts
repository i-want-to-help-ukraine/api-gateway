import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IDatasource } from '../../datasources/datasource.interface';
import { VolunteerDto } from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';
import { UpdateProfileV2Input } from '../../graphql.schema';
import { UseGuards } from '@nestjs/common';
import { BackofficeAuthGuard } from '../../guards/backoffice/backoffice-auth.guard';

@Resolver()
export class PatchVolunteerResolver {
  @Mutation('patchVolunteer')
  @UseGuards(BackofficeAuthGuard)
  async patchVolunteer(
    @Args('authId') authId: string,
    @Args('input') input: UpdateProfileV2Input,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<VolunteerDto | undefined> {
    return dataSources.volunteer.updateProfileV2(authId, input);
  }
}
