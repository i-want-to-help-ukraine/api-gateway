import {
  Args,
  Context,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  VolunteerByIdInput,
  VolunteerContact,
  VolunteerPaymentOption,
  VolunteerSocial,
} from '../../graphql.schema';
import { IDatasource } from '../../datasources/datasource.interface';
import {
  ActivityDto,
  CityDto,
  VolunteerDto,
} from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';

@Resolver('Volunteer')
export class VolunteerResolver {
  @Query()
  async volunteer(
    @Args('input') input: VolunteerByIdInput,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<VolunteerDto | null> {
    return dataSources.volunteer.getVolunteer(input.id);
  }

  @ResolveField('cities')
  async cities(
    @Parent() volunteer: VolunteerDto,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<(CityDto | Error | null)[]> {
    return dataSources.volunteer.getCities(volunteer.cityIds);
  }

  @ResolveField('activities')
  async activities(
    @Parent() volunteer: VolunteerDto,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<(ActivityDto | Error | null)[]> {
    return dataSources.volunteer.getActivities(volunteer.activityIds);
  }

  @ResolveField('payments')
  async payments(
    @Parent() volunteer: VolunteerDto,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<(VolunteerPaymentOption | Error | null)[]> {
    return dataSources.volunteer.getVolunteerPaymentOptions([volunteer.id]);
  }

  @ResolveField('social')
  async social(
    @Parent() volunteer: VolunteerDto,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<VolunteerSocial[]> {
    return dataSources.volunteer.getVolunteerSocial([volunteer.id]);
  }

  @ResolveField('contacts')
  async contacts(
    @Parent() volunteer: VolunteerDto,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<VolunteerContact[]> {
    return dataSources.volunteer.getVolunteerContacts([volunteer.id]);
  }
}
