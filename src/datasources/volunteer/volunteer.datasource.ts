import { DataSource } from 'apollo-datasource';
import {
  SearchVolunteersDto,
  VolunteerServiceRPCClient,
  VolunteerDto,
  CityDto,
  VolunteerPaymentOptionDto,
  VolunteerSocialDto,
  CreateVolunteerDto,
} from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';
import * as DataLoader from 'dataloader';
import { lastValueFrom, map } from 'rxjs';
import {
  Activity,
  City,
  CreateVolunteerInput,
  PaymentProvider,
  SearchInput,
  SocialProvider,
  VolunteerPaymentOption,
} from '../../graphql.schema';

export class VolunteerDatasource extends DataSource {
  private volunteerLoader = new DataLoader<string, VolunteerDto | null>(
    async (ids: string[]) => {
      const volunteers = await lastValueFrom(
        this.volunteerServiceRPC
          .getVolunteersByIds({ ids })
          .pipe(map((response) => response.volunteers)),
      );

      return ids.map(
        (id) => volunteers.find((volunteer) => volunteer.id === id) || null,
      );
    },
  );

  constructor(private volunteerServiceRPC: VolunteerServiceRPCClient) {
    super();
  }

  getVolunteer(id: string): Promise<VolunteerDto | null> {
    return this.volunteerLoader.load(id);
  }

  getActivities(): Promise<Activity[]> {
    return lastValueFrom(
      this.volunteerServiceRPC
        .getActivities({})
        .pipe(map((response) => response.activities)),
    );
  }

  getCities(): Promise<City[]> {
    return lastValueFrom(
      this.volunteerServiceRPC
        .getCities({})
        .pipe(map((response) => response.cities)),
    );
  }

  getSocialProviders(): Promise<SocialProvider[]> {
    return lastValueFrom(
      this.volunteerServiceRPC
        .getSocialProviders({})
        .pipe(map((response) => response.socialProviders)),
    );
  }

  getPaymentProviders(): Promise<PaymentProvider[]> {
    return lastValueFrom(
      this.volunteerServiceRPC
        .getPaymentProviders({})
        .pipe(map((response) => response.paymentProvider)),
    );
  }

  searchVolunteers(request: SearchInput): Promise<VolunteerDto[]> {
    const rpcRequest: SearchVolunteersDto = {
      cityIds: [],
      activityIds: [],
    };

    return lastValueFrom(
      this.volunteerServiceRPC
        .search(rpcRequest)
        .pipe(map((response) => response.volunteers)),
    );
  }

  getVolunteerCities(volunteerId: string): Promise<CityDto[]> {
    return lastValueFrom(
      this.volunteerServiceRPC
        .getVolunteerCities({ volunteerIds: [volunteerId] })
        .pipe(map((response) => response.cities)),
    );
  }

  getVolunteerActivities(volunteerId: string): Promise<Activity[]> {
    return lastValueFrom(
      this.volunteerServiceRPC
        .getVolunteerActivities({ volunteerIds: [volunteerId] })
        .pipe(map((response) => response.activities)),
    );
  }

  getVolunteerPaymentOptions(
    volunteerId: string,
  ): Promise<VolunteerPaymentOption[]> {
    return lastValueFrom(
      this.volunteerServiceRPC
        .getVolunteerPaymentOptions({ volunteerIds: [volunteerId] })
        .pipe(
          map((response) =>
            response.paymentOptions.map((paymentOption) =>
              this.mapVolunteerPaymentOption(paymentOption),
            ),
          ),
        ),
    );
  }

  getVolunteerSocial(volunteerId: string): Promise<VolunteerSocialDto[]> {
    return lastValueFrom(
      this.volunteerServiceRPC
        .getVolunteerSocial({ volunteerIds: [volunteerId] })
        .pipe(map((response) => response.volunteerSocial)),
    );
  }

  async createVolunteer(
    input: CreateVolunteerInput,
  ): Promise<VolunteerDto | undefined> {
    const createVolunteerDto: CreateVolunteerDto = {
      firstname: input.firstname,
      lastname: input.lastname,
      cityIds: input.cityIds,
      activityIds: input.activityIds,
      social: input.social.map((social) => ({
        url: social.url,
        socialProviderId: social.socialProviderId,
      })),
      paymentOptions: input.paymentOptions.map((paymentOption) => ({
        metadata: undefined,
        paymentOptionId: paymentOption.paymentProviderId,
      })),
      contacts: input.contacts
        ? input.contacts?.map((contact) => ({
            metadata: undefined,
            contactProviderId: contact.contactProviderId,
          }))
        : [],
    };

    return lastValueFrom(
      this.volunteerServiceRPC
        .createVolunteer(createVolunteerDto)
        .pipe(map((response) => response.volunteer)),
    );
  }

  private mapVolunteerPaymentOption(
    volunteerPayment: VolunteerPaymentOptionDto,
  ): VolunteerPaymentOption {
    const { id } = volunteerPayment;

    return {
      id,
      metadata: '',
    };
  }
}
