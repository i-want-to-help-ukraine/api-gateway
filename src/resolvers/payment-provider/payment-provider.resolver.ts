import { Context, Parent, Query, Resolver } from '@nestjs/graphql';
import { VolunteerPaymentOptionDto } from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';
import { IDatasource } from '../../datasources/datasource.interface';

@Resolver('PaymentProvider')
export class PaymentProviderResolver {
  @Query()
  async paymentProvider(
    @Parent() volunteerPayment: VolunteerPaymentOptionDto,
    @Context('dataSources') dataSources: IDatasource,
  ) {
    return dataSources.volunteer.getPaymentProviders([
      volunteerPayment.providerId,
    ]);
  }
}
