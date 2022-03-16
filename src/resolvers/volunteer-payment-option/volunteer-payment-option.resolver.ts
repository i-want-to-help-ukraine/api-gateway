import {
  Args,
  Context,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  PaymentProvider,
  VolunteerByIdInput,
  VolunteerPaymentOption,
} from '../../graphql.schema';
import { IDatasource } from '../../datasources/datasource.interface';

@Resolver('VolunteerPaymentOption')
export class VolunteerPaymentOptionResolver {
  @Query()
  async volunteerPaymentOption(
    @Args('input') input: VolunteerByIdInput,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<(VolunteerPaymentOption | Error | null)[]> {
    return dataSources.volunteer.getVolunteerPaymentOptions([input.id]);
  }

  @ResolveField('provider')
  async provider(
    @Parent() volunteerPaymentOption: VolunteerPaymentOption,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<PaymentProvider | null> {
    return dataSources.volunteer.getPaymentProvider(
      volunteerPaymentOption.providerId,
    );
  }
}
