import { Context, Query, Resolver } from '@nestjs/graphql';
import { IDatasource } from '../../datasources/datasource.interface';
import { PaymentProvider } from '../../graphql.schema';

@Resolver()
export class PaymentProvidersResolver {
  @Query('paymentProviders')
  async paymentProviders(
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<PaymentProvider[]> {
    return dataSources.volunteer.getPaymentProviders();
  }
}
