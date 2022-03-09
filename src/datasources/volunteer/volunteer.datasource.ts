import { DataSource } from 'apollo-datasource';
import {
  VolunteerServiceRPCClient,
  VolunteerDto,
  SearchVolunteersRequest,
  CityDto,
  ActivityDto,
  SocialProviderDto,
  PaymentProviderDto,
  VolunteerPaymentOptionDto,
  VolunteerSocialDto,
} from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';
import * as DataLoader from 'dataloader';
import { lastValueFrom, map } from 'rxjs';
import {
  SearchInput,
  SocialProvider,
  VolunteerActivity,
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

  searchVolunteers(request: SearchInput): Promise<VolunteerDto[]> {
    const { cityIds, activityTypeIds, paymentOptionIds } = request;

    const rpcRequest: SearchVolunteersRequest = {
      cityIds: cityIds || [],
      activityIds: activityTypeIds || [],
      paymentOptionIds: paymentOptionIds || [],
    };

    return lastValueFrom(
      this.volunteerServiceRPC
        .search(rpcRequest)
        .pipe(map((response) => response.volunteers)),
    );
  }

  getCities(): Promise<CityDto[]> {
    return lastValueFrom(
      this.volunteerServiceRPC
        .getCities({ ids: [] })
        .pipe(map((response) => response.cities)),
    );
  }

  getActivities(): Promise<ActivityDto[]> {
    return lastValueFrom(
      this.volunteerServiceRPC
        .getActivities({ ids: [] })
        .pipe(map((response) => response.activities)),
    );
  }

  getSocialProviders(): Promise<SocialProvider[]> {
    return lastValueFrom(
      this.volunteerServiceRPC
        .getSocialProviders({ ids: [] })
        .pipe(map((response) => response.socialProviders)),
    );
  }

  getPaymentProviders(): Promise<PaymentProviderDto[]> {
    return lastValueFrom(
      this.volunteerServiceRPC
        .getPaymentProviders({ ids: [] })
        .pipe(map((response) => response.paymentProvider)),
    );
  }

  getVolunteerCities(volunteerId: string): Promise<CityDto[]> {
    return lastValueFrom(
      this.volunteerServiceRPC
        .getVolunteerCities({ volunteerId })
        .pipe(map((response) => response.cities)),
    );
  }

  getVolunteerActivities(volunteerId: string): Promise<VolunteerActivity[]> {
    return lastValueFrom(
      this.volunteerServiceRPC
        .getVolunteerActivities({ volunteerId })
        .pipe(map((response) => response.activities)),
    );
  }

  getVolunteerPaymentOptions(
    volunteerId: string,
  ): Promise<VolunteerPaymentOptionDto[]> {
    return lastValueFrom(
      this.volunteerServiceRPC
        .getVolunteerPaymentOptions({ volunteerId })
        .pipe(map((response) => response.paymentOptions)),
    );
  }

  getVolunteerSocial(volunteerId: string): Promise<VolunteerSocialDto[]> {
    return lastValueFrom(
      this.volunteerServiceRPC
        .getVolunteerSocial({ volunteerId })
        .pipe(map((response) => response.volunteerSocial)),
    );
  }
}
