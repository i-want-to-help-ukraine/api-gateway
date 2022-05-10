import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IDatasource } from '../../datasources/datasource.interface';
import { VolunteerDto } from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth/auth-guard.service';
import { BackofficeAuthGuard } from '../../guards/backoffice/backoffice-auth.guard';

@Resolver()
export class RejectVolunteerResolver {
  @Mutation('rejectVolunteer')
  @UseGuards(BackofficeAuthGuard)
  async rejectVolunteer(
    @Args('id') id: string,
    @Context('dataSources')
    dataSources: IDatasource,
  ): Promise<VolunteerDto | undefined> {
    return dataSources.volunteer.rejectVolunteer(id);
  }
}
