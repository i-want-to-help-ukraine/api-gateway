import { DataSource } from 'apollo-datasource';
import {
  SearchVolunteersDto,
  VolunteerServiceRPCClient,
  VolunteerDto,
  VolunteerPaymentOptionDto,
  VolunteerSocialDto,
  CreateVolunteerDto,
  VolunteerContactDto,
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

  private cityLoader = new DataLoader<string, City | null>(
    async (ids: string[]) => {
      const cities = await lastValueFrom(
        this.volunteerServiceRPC
          .getCities({ ids })
          .pipe(map((response) => response.cities)),
      );

      return ids.map(
        (cityId) => cities.find((city) => city.id === cityId) || null,
      );
    },
  );

  private activityLoader = new DataLoader<string, Activity | null>(
    async (ids: string[]) => {
      const volunteerActivities = await lastValueFrom(
        this.volunteerServiceRPC
          .getActivities({ ids })
          .pipe(map((response) => response.activities)),
      );

      return ids.map(
        (activityId) =>
          volunteerActivities.find((activity) => activity.id === activityId) ||
          null,
      );
    },
  );

  private volunteerSocialLoader = new DataLoader<
    string,
    VolunteerSocialDto | null
  >(async (volunteerIds: string[]) => {
    const volunteerSocial = await lastValueFrom(
      this.volunteerServiceRPC
        .getVolunteerSocial({ volunteerIds })
        .pipe(map((response) => response.volunteerSocial)),
    );

    return volunteerIds.map(
      (volunteerId) =>
        volunteerSocial.find((social) => social.volunteerId === volunteerId) ||
        null,
    );
  });

  private volunteerPaymentOptionLoader = new DataLoader<
    string,
    VolunteerPaymentOption | null
  >(async (volunteerIds: string[]) => {
    const paymentOptions = await lastValueFrom(
      this.volunteerServiceRPC
        .getVolunteerPaymentOptions({ volunteerIds })
        .pipe(
          map((response) =>
            response.paymentOptions.map((paymentOption) =>
              this.mapVolunteerPaymentOption(paymentOption),
            ),
          ),
        ),
    );

    return volunteerIds.map(
      (volunteerId) =>
        paymentOptions.find(
          (paymentOption) => paymentOption.volunteerId === volunteerId,
        ) || null,
    );
  });

  private volunteerContactLoader = new DataLoader<
    string,
    VolunteerContactDto | null
  >(async (volunteerIds: string[]) => {
    const contacts = await lastValueFrom(
      this.volunteerServiceRPC
        .getVolunteerContacts({ volunteerIds })
        .pipe(map((response) => response.contacts)),
    );

    return volunteerIds.map(
      (volunteerId) =>
        contacts.find((volunteer) => volunteer.volunteerId === volunteerId) ||
        null,
    );
  });

  constructor(private volunteerServiceRPC: VolunteerServiceRPCClient) {
    super();
  }

  getVolunteer(id: string): Promise<VolunteerDto | null> {
    return this.volunteerLoader.load(id);
  }

  getActivities(ids: string[]): Promise<any[]> {
    if (ids.length > 0) {
      return this.activityLoader.loadMany(ids);
    }

    return lastValueFrom(
      this.volunteerServiceRPC
        .getActivities({ ids: [] })
        .pipe(map((response) => response.activities)),
    );
  }

  getCities(ids: string[]): Promise<any[]> {
    if (ids.length > 0) {
      return this.cityLoader.loadMany(ids);
    }

    return lastValueFrom(
      this.volunteerServiceRPC
        .getCities({ ids: [] })
        .pipe(map((response) => response.cities)),
    );
  }

  getSocialProviders(): Promise<SocialProvider[]> {
    return lastValueFrom(
      this.volunteerServiceRPC
        .getSocialProviders({ ids: [] })
        .pipe(map((response) => response.socialProviders)),
    );
  }

  getPaymentProviders(): Promise<PaymentProvider[]> {
    return lastValueFrom(
      this.volunteerServiceRPC
        .getPaymentProviders({ ids: [] })
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

  getVolunteerPaymentOptions(volunteerIds: string[]): Promise<any[]> {
    return this.volunteerPaymentOptionLoader.loadMany(volunteerIds);
  }

  getVolunteerSocial(volunteerIds: string[]): Promise<any[]> {
    return this.volunteerSocialLoader.loadMany(volunteerIds);
  }

  getVolunteerContacts(volunteerIds: string[]): Promise<any[]> {
    return this.volunteerContactLoader.loadMany(volunteerIds);
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
    const { id, volunteerId } = volunteerPayment;

    return {
      id,
      metadata: '',
      volunteerId,
    };
  }
}
