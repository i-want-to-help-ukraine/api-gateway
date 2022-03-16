import {
  Args,
  Context,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { VolunteerByIdInput, VolunteerContact } from '../../graphql.schema';
import { IDatasource } from '../../datasources/datasource.interface';

@Resolver('VolunteerContact')
export class VolunteerContactResolver {
  @Query()
  async volunteerContact(
    @Args('input') input: VolunteerByIdInput,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<(VolunteerContact | Error | null)[]> {
    return dataSources.volunteer.getVolunteerContacts([input.id]);
  }

  @ResolveField('provider')
  async provider(
    @Parent() volunteerPaymentOption: VolunteerContact,
    @Context('dataSources') dataSources: IDatasource,
  ) {
    return dataSources.volunteer.getContactProvider(
      volunteerPaymentOption.providerId,
    );
  }
}
