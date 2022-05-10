import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { VolunteerDto } from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';
import { IDatasource } from '../../datasources/datasource.interface';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth/auth-guard.service';
import { BackofficeAuthGuard } from '../../guards/backoffice/backoffice-auth.guard';

@Resolver()
export class VerifyVolunteerResolver {
  @Mutation('verifyVolunteer')
  @UseGuards(BackofficeAuthGuard)
  async verifyVolunteer(
    @Args('id') id: string,
    @Context('dataSources')
    dataSources: IDatasource,
  ): Promise<VolunteerDto | undefined> {
    return dataSources.volunteer.verifyVolunteer(id);
  }
}
