import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth/auth-guard.service';
import { AddSocialProviderInput, SocialProvider } from '../../graphql.schema';
import { IDatasource } from '../../datasources/datasource.interface';

@Resolver()
export class AddSocialProviderResolver {
  @Mutation('addPaymentProvider')
  @UseGuards(AuthGuard)
  async addSocialProvider(
    @Args('input') input: AddSocialProviderInput,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<SocialProvider> {
    return dataSources.volunteer.addSocialProvider(input);
  }
}
