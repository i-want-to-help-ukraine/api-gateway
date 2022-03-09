import {
  Args,
  Context,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { IDatasource } from '../../datasources/datasource.interface';
import {
  City,
  SearchInput,
  VolunteerActivity,
  VolunteerPaymentOption,
  VolunteerSocial,
} from '../../graphql.schema';
import { VolunteerDto } from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';

@Resolver()
export class VolunteersSearchResolver {
  @Query('volunteersSearch')
  async volunteersSearch(
    @Args('request') request: SearchInput,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<VolunteerDto[]> {
    return dataSources.volunteer.searchVolunteers(request);
  }

  @ResolveField('cities')
  async cities(
    @Parent() volunteer: VolunteerDto,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<City[]> {
    return dataSources.volunteer.getVolunteerCities(volunteer.id);
  }

  @ResolveField('activities')
  async activities(
    @Parent() volunteer: VolunteerDto,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<VolunteerActivity[]> {
    return dataSources.volunteer.getVolunteerActivities(volunteer.id);
  }

  @ResolveField('payments')
  async payments(
    @Parent() volunteer: VolunteerDto,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<VolunteerPaymentOption[]> {
    return dataSources.volunteer.getVolunteerPaymentOptions(volunteer.id);
  }

  @ResolveField('social')
  async social(
    @Parent() volunteer: VolunteerDto,
    @Context('dataSources') dataSources: IDatasource,
  ): Promise<VolunteerSocial[]> {
    return dataSources.volunteer.getVolunteerSocial(volunteer.id);
  }
}
