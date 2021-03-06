import { DataSource } from 'apollo-datasource';
import {
  SearchVolunteersDto,
  VolunteerServiceRPCClient,
  VolunteerDto,
  VolunteerPaymentOptionDto,
  VolunteerContactDto,
  CreateProfileDto,
  UpdateProfileDto,
  PatchVolunteerRequestDto,
} from '@i-want-to-help-ukraine/protobuf/types/volunteer-service';
import * as DataLoader from 'dataloader';
import { catchError, lastValueFrom, map } from 'rxjs';
import {
  Activity,
  AddActivityInput,
  AddContactProviderInput,
  AddPaymentProviderInput,
  AddSocialProviderInput,
  City,
  ContactProvider,
  CreateProfileInput,
  PaymentProvider,
  SearchInput,
  SocialProvider,
  UpdateProfileInput,
  VerificationStatus,
  Volunteer,
  VolunteerContact,
  VolunteerPaymentOption,
  VolunteerSearchEdge,
  VolunteerSearchResponse,
  VolunteerSocial,
} from '../../graphql.schema';
import { BadRequestException, NotFoundException } from '@nestjs/common';

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

  private socialProviderLoader = new DataLoader<string, SocialProvider | null>(
    async (ids: string[]) => {
      const socialProviders = await lastValueFrom(
        this.volunteerServiceRPC
          .getSocialProviders({ ids })
          .pipe(map((response) => response.socialProviders)),
      );

      return ids.map(
        (socialProviderId) =>
          socialProviders.find(
            (socialProvider) => socialProvider.id === socialProviderId,
          ) || null,
      );
    },
  );

  private paymentProviderLoader = new DataLoader<
    string,
    PaymentProvider | null
  >(async (ids: string[]) => {
    const paymentProviders = await lastValueFrom(
      this.volunteerServiceRPC
        .getPaymentProviders({ ids })
        .pipe(map((response) => response.paymentProvider)),
    );

    return ids.map(
      (paymentProviderId) =>
        paymentProviders.find(
          (paymentProvider) => paymentProvider.id === paymentProviderId,
        ) || null,
    );
  });

  private contactProviderLoader = new DataLoader<
    string,
    ContactProvider | null
  >(async (ids: string[]) => {
    const contactProviders = await lastValueFrom(
      this.volunteerServiceRPC
        .getContactProviders({ ids })
        .pipe(map((response) => response.contactProviders)),
    );

    return ids.map(
      (contactProviderId) =>
        contactProviders.find(
          (contactProvider) => contactProvider.id === contactProviderId,
        ) || null,
    );
  });

  constructor(private volunteerServiceRPC: VolunteerServiceRPCClient) {
    super();
  }

  getVolunteer(id: string): Promise<VolunteerDto | null> {
    return this.volunteerLoader.load(id);
  }

  async getActivities(ids: string[]): Promise<(Activity | Error | null)[]> {
    if (ids.length > 0) {
      return (await this.activityLoader.loadMany(ids)).filter(
        (i) => i !== null && !(i instanceof Error),
      );
    }

    return lastValueFrom(
      this.volunteerServiceRPC
        .getActivities({ ids: [] })
        .pipe(map((response) => response.activities)),
    );
  }

  async getCities(ids: string[]): Promise<(City | Error | null)[]> {
    if (ids.length > 0) {
      return (await this.cityLoader.loadMany(ids)).filter(
        (i) => i !== null && !(i instanceof Error),
      );
    }

    return lastValueFrom(
      this.volunteerServiceRPC
        .getCities({ ids: [] })
        .pipe(map((response) => response.cities)),
    );
  }

  async getSocialProviders(
    ids: string[],
  ): Promise<(SocialProvider | Error | null)[]> {
    if (ids.length > 0) {
      return (await this.socialProviderLoader.loadMany(ids)).filter(
        (i) => i !== null && !(i instanceof Error),
      );
    }

    return lastValueFrom(
      this.volunteerServiceRPC
        .getSocialProviders({ ids })
        .pipe(map((response) => response.socialProviders)),
    );
  }

  getSocialProvider(id: string): Promise<SocialProvider | null> {
    return this.socialProviderLoader.load(id);
  }

  async getPaymentProviders(
    ids: string[],
  ): Promise<(PaymentProvider | Error | null)[]> {
    if (ids.length > 0) {
      return (await this.paymentProviderLoader.loadMany(ids)).filter(
        (i) => i !== null && !(i instanceof Error),
      );
    }

    return lastValueFrom(
      this.volunteerServiceRPC
        .getPaymentProviders({ ids: [] })
        .pipe(map((response) => response.paymentProvider)),
    );
  }

  getPaymentProvider(id: string): Promise<PaymentProvider | null> {
    return this.paymentProviderLoader.load(id);
  }

  async getContactProviders(
    ids: string[],
  ): Promise<(ContactProvider | Error | null)[]> {
    if (ids.length > 0) {
      return (await this.contactProviderLoader.loadMany(ids)).filter(
        (i) => i !== null && !(i instanceof Error),
      );
    }

    return lastValueFrom(
      this.volunteerServiceRPC
        .getContactProviders({ ids: [] })
        .pipe(map((response) => response.contactProviders)),
    );
  }

  getContactProvider(id: string): Promise<ContactProvider | null> {
    return this.contactProviderLoader.load(id);
  }

  async searchVolunteers(
    request: SearchInput,
  ): Promise<VolunteerSearchResponse> {
    const { cityIds, activityIds, count, offset, startCursor } = request;

    const rpcRequest: SearchVolunteersDto = {
      cityIds: cityIds || [],
      activityIds: activityIds || [],
      offset,
      count,
      startCursor: startCursor || undefined,
    };

    const searchResponse = await lastValueFrom(
      this.volunteerServiceRPC.search(rpcRequest),
    );

    const { volunteers, totalCount, endCursor, hasNextPage } = searchResponse;

    const edges: VolunteerSearchEdge[] = volunteers.map((volunteer) => ({
      cursor: volunteer.id,
      node: this.mapVolunteer(volunteer),
    }));

    return {
      totalCount,
      startCursor,
      edges,
      pageInfo: {
        endCursor,
        hasNextPage,
      },
    };
  }

  async getVolunteerPaymentOptions(
    volunteerIds: string[],
  ): Promise<(VolunteerPaymentOption | Error | null)[]> {
    return lastValueFrom(
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
  }

  async getVolunteerSocial(
    volunteerIds: string[],
  ): Promise<(VolunteerSocial | Error | null)[]> {
    return lastValueFrom(
      this.volunteerServiceRPC
        .getVolunteerSocial({ volunteerIds })
        .pipe(map((response) => response.volunteerSocial)),
    );
  }

  async getVolunteerContacts(
    volunteerIds: string[],
  ): Promise<(VolunteerContact | Error | null)[]> {
    return lastValueFrom(
      this.volunteerServiceRPC
        .getVolunteerContacts({ volunteerIds })
        .pipe(
          map((response) =>
            response.contacts.map((contact) =>
              this.mapVolunteerContact(contact),
            ),
          ),
        ),
    );
  }

  async createVolunteer(
    authId: string,
    input: CreateProfileInput,
  ): Promise<VolunteerDto | undefined> {
    const {
      firstName,
      lastName,
      description,
      avatarUrl,
      organization,
      cityIds,
      activityIds,
      paymentOptions,
      social,
      contacts,
    } = input;

    if (cityIds.length === 0) {
      throw new BadRequestException('At least one city should be present');
    }

    if (activityIds.length === 0) {
      throw new BadRequestException('At least one activity should be present');
    }

    const createProfileDto: CreateProfileDto = {
      authId,
      firstName,
      lastName,
      description: description || undefined,
      avatarUrl,
      organization: organization || undefined,
      cityIds,
      activityIds,
      social: social.map(({ url, socialProviderId }) => ({
        url,
        socialProviderId,
      })),
      paymentOptions: paymentOptions.map(({ metadata, paymentProviderId }) => ({
        metadata: JSON.stringify(metadata),
        paymentProviderId,
      })),
      contacts: contacts
        ? contacts?.map(({ metadata, contactProviderId }) => ({
            metadata: JSON.stringify(metadata),
            contactProviderId,
          }))
        : [],
    };

    return lastValueFrom(
      this.volunteerServiceRPC.createProfile(createProfileDto).pipe(
        map((response) => response.volunteer),
        catchError(() => {
          throw new BadRequestException();
        }),
      ),
    );
  }

  updateProfile(
    authId: string,
    input: UpdateProfileInput,
  ): Promise<VolunteerDto | undefined> {
    const {
      firstName,
      lastName,
      description,
      avatarUrl,
      organization,
      cityIds,
      activityIds,
      social,
      paymentOptions,
      contacts,
    } = input;

    const updateProfileDto: UpdateProfileDto = {
      authId,
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      description: description || undefined,
      organization: organization || undefined,
      avatarUrl: avatarUrl || undefined,
      cityIds: cityIds || [],
      activityIds: activityIds || [],
      social: {
        create: social?.create || [],
        delete: social?.delete || [],
      },
      paymentOptions: {
        create:
          paymentOptions?.create?.map((paymentOption) => ({
            metadata: JSON.stringify(paymentOption.metadata),
            paymentProviderId: paymentOption.paymentProviderId,
          })) || [],
        delete: paymentOptions?.delete || [],
      },
      contacts: {
        create:
          contacts?.create?.map((contact) => ({
            metadata: JSON.stringify(contact.metadata),
            contactProviderId: contact.contactProviderId,
          })) || [],
        delete: contacts?.delete || [],
      },
    };

    return lastValueFrom(
      this.volunteerServiceRPC.updateProfile(updateProfileDto).pipe(
        map((response) => response.volunteer),
        catchError(() => {
          throw new BadRequestException();
        }),
      ),
    );
  }

  hideProfile(authId: string): Promise<VolunteerDto | undefined> {
    return lastValueFrom(
      this.volunteerServiceRPC.hideProfile({ authId }).pipe(
        map((response) => response.volunteer),
        catchError(() => {
          throw new BadRequestException();
        }),
      ),
    );
  }

  getVolunteerProfile(authId: string): Promise<VolunteerDto | undefined> {
    return lastValueFrom(
      this.volunteerServiceRPC.getVolunteerAuthProfile({ authId }).pipe(
        map((response) => response.volunteer),
        catchError(() => {
          throw new NotFoundException();
        }),
      ),
    );
  }

  verifyVolunteer(volunteerId: string): Promise<VolunteerDto | undefined> {
    return lastValueFrom(
      this.volunteerServiceRPC
        .changeVolunteerStatus({
          volunteerId,
          status: VerificationStatus.verified,
        })
        .pipe(
          map((response) => response.volunteer),
          catchError((e) => {
            console.error(e);
            throw new NotFoundException();
          }),
        ),
    );
  }

  rejectVolunteer(volunteerId: string): Promise<VolunteerDto | undefined> {
    return lastValueFrom(
      this.volunteerServiceRPC
        .changeVolunteerStatus({
          volunteerId,
          status: VerificationStatus.rejected,
        })
        .pipe(
          map((response) => response.volunteer),
          catchError(() => {
            throw new NotFoundException();
          }),
        ),
    );
  }

  patchVolunteer(
    volunteerId: string,
    input: UpdateProfileInput,
  ): Promise<VolunteerDto | undefined> {
    const {
      firstName,
      lastName,
      description,
      avatarUrl,
      organization,
      cityIds,
      activityIds,
      social,
      paymentOptions,
      contacts,
    } = input;

    const request: PatchVolunteerRequestDto = {
      volunteerId,
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      description: description || undefined,
      avatarUrl: avatarUrl || undefined,
      organization: organization || undefined,
      cityIds: cityIds || [],
      activityIds: activityIds || [],
      social: {
        create: social?.create || [],
        delete: social?.delete || [],
      },
      paymentOptions: {
        create:
          paymentOptions?.create?.map((paymentOption) => ({
            metadata: JSON.stringify(paymentOption.metadata),
            paymentProviderId: paymentOption.paymentProviderId,
          })) || [],
        delete: paymentOptions?.delete || [],
      },
      contacts: {
        create:
          contacts?.create?.map((contact) => ({
            metadata: JSON.stringify(contact.metadata),
            contactProviderId: contact.contactProviderId,
          })) || [],
        delete: contacts?.delete || [],
      },
    };

    return lastValueFrom(
      this.volunteerServiceRPC
        .patchVolunteer(request)
        .pipe(map((response) => response.volunteer)),
    );
  }

  async getRequestedVolunteers(): Promise<VolunteerDto[]> {
    const volunteers = await lastValueFrom(
      this.volunteerServiceRPC
        .getRequestedVolunteers({})
        .pipe(map((response) => response)),
    );

    return volunteers.volunteers;
  }

  addActivity(request: AddActivityInput): Promise<Activity> {
    return lastValueFrom(this.volunteerServiceRPC.addActivity(request));
  }

  addPaymentProvider(
    request: AddPaymentProviderInput,
  ): Promise<PaymentProvider> {
    return lastValueFrom(this.volunteerServiceRPC.addPaymentProvider(request));
  }

  addSocialProvider(request: AddSocialProviderInput): Promise<SocialProvider> {
    return lastValueFrom(this.volunteerServiceRPC.addSocialProvider(request));
  }

  addContactProvider(
    request: AddContactProviderInput,
  ): Promise<ContactProvider> {
    return lastValueFrom(this.volunteerServiceRPC.addContactProvider(request));
  }

  private mapVolunteer(volunteerDto: VolunteerDto): Volunteer {
    const {
      id,
      firstName,
      lastName,
      description,
      avatarUrl,
      organization,
      verificationStatus,
      activityIds,
      cityIds,
    } = volunteerDto;

    return {
      id,
      firstName,
      lastName,
      description,
      organization,
      avatarUrl,
      verificationStatus,
      activityIds,
      cityIds,
      cities: [],
      activities: [],
      social: [],
      payments: [],
      contacts: [],
    };
  }

  private mapVolunteerContact(
    volunteerContact: VolunteerContactDto,
  ): VolunteerContact {
    const { id, metadata, volunteerId, providerId } = volunteerContact;

    return {
      id,
      metadata: JSON.parse(metadata),
      volunteerId,
      providerId,
    };
  }

  private mapVolunteerPaymentOption(
    volunteerPayment: VolunteerPaymentOptionDto,
  ): VolunteerPaymentOption {
    const { id, metadata, volunteerId, providerId } = volunteerPayment;

    return {
      id,
      metadata: JSON.parse(metadata),
      volunteerId,
      providerId,
    };
  }
}
