import { Context, Query, Resolver } from '@nestjs/graphql';
import { IDatasource } from '../../datasources/datasource.interface';

@Resolver('PaymentProviders')
export class PaymentProvidersResolver {
  @Query()
  async paymentProviders(@Context('dataSources') dataSources: IDatasource) {
    return dataSources.volunteer.getPaymentProviders([]);
  }
}
