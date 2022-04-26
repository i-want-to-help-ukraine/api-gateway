import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth/auth-guard.service';
import { AddPaymentProviderInput, PaymentProvider } from '../../graphql.schema';
import { IDatasource } from '../../datasources/datasource.interface';

@Resolver()
export class AddPaymentProviderResolver {
  @Mutation('addPaymentProvider')
  @UseGuards(AuthGuard)
  async addPaymentProvider(
    @Args('input') input: AddPaymentProviderInput,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<PaymentProvider> {
    return dataSources.volunteer.addPaymentProvider(input);
  }
}
