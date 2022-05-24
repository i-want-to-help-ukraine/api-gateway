
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum VerificationStatus {
    requested = "requested",
    inProgress = "inProgress",
    rejected = "rejected",
    verified = "verified",
    banned = "banned"
}

export class CreateProfileInput {
    firstName: string;
    lastName: string;
    avatarUrl: string;
    description?: Nullable<string>;
    organization?: Nullable<string>;
    cityIds: string[];
    activityIds: string[];
    social: CreateVolunteerSocialInput[];
    paymentOptions: CreateVolunteerPaymentOptionInput[];
    contacts?: Nullable<CreateVolunteerContactInput[]>;
}

export class UpdateProfileInput {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    avatarUrl?: Nullable<string>;
    description?: Nullable<string>;
    organization?: Nullable<string>;
    cityIds?: Nullable<string[]>;
    activityIds?: Nullable<string[]>;
    social?: Nullable<CreateOrDeleteVolunteerSocialInput>;
    contacts?: Nullable<CreateOrDeleteVolunteerContactInput>;
    paymentOptions?: Nullable<CreateOrDeleteVolunteerPaymentOptionInput>;
}

export class CreateOrDeleteVolunteerSocialInput {
    create?: Nullable<CreateVolunteerSocialInput[]>;
    delete?: Nullable<string[]>;
}

export class CreateVolunteerSocialInput {
    url: string;
    socialProviderId: string;
}

export class CreateOrDeleteVolunteerContactInput {
    create?: Nullable<CreateVolunteerContactInput[]>;
    delete?: Nullable<string[]>;
}

export class CreateVolunteerContactInput {
    metadata: JSON;
    contactProviderId: string;
}

export class CreateOrDeleteVolunteerPaymentOptionInput {
    create?: Nullable<CreateVolunteerPaymentOptionInput[]>;
    delete?: Nullable<string[]>;
}

export class CreateVolunteerPaymentOptionInput {
    metadata: JSON;
    paymentProviderId: string;
}

export class UpdateProfileV2Input {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    avatarUrl?: Nullable<string>;
    description?: Nullable<string>;
    organization?: Nullable<string>;
    cityIds?: Nullable<string[]>;
    activityIds?: Nullable<string[]>;
    social?: Nullable<CreateVolunteerSocialInput[]>;
    contacts?: Nullable<CreateVolunteerContactInput[]>;
    paymentOptions?: Nullable<CreateVolunteerPaymentOptionInput[]>;
}

export class HideProfileInput {
    volunteerId: string;
}

export class VolunteerByIdInput {
    id: string;
}

export class SearchInput {
    cityIds?: Nullable<string[]>;
    activityIds?: Nullable<string[]>;
    startCursor?: Nullable<string>;
    count: number;
    offset: number;
}

export class AddActivityInput {
    title: string;
    description: string;
}

export class AddPaymentProviderInput {
    title: string;
}

export class AddSocialProviderInput {
    title: string;
}

export class AddContactProviderInput {
    title: string;
}

export abstract class IQuery {
    abstract cities(): Nullable<Nullable<City>[]> | Promise<Nullable<Nullable<City>[]>>;

    abstract activities(): Nullable<Nullable<Activity>[]> | Promise<Nullable<Nullable<Activity>[]>>;

    abstract socialProvider(): Nullable<SocialProvider> | Promise<Nullable<SocialProvider>>;

    abstract socialProviders(): Nullable<Nullable<SocialProvider>[]> | Promise<Nullable<Nullable<SocialProvider>[]>>;

    abstract paymentProviders(): Nullable<Nullable<PaymentProvider>[]> | Promise<Nullable<Nullable<PaymentProvider>[]>>;

    abstract contactProviders(): Nullable<Nullable<ContactProvider>[]> | Promise<Nullable<Nullable<ContactProvider>[]>>;

    abstract volunteersSearch(input?: Nullable<SearchInput>): Nullable<VolunteerSearchResponse> | Promise<Nullable<VolunteerSearchResponse>>;

    abstract volunteer(input: VolunteerByIdInput): Nullable<Volunteer> | Promise<Nullable<Volunteer>>;

    abstract volunteerSocial(input: VolunteerByIdInput): Nullable<VolunteerSocial> | Promise<Nullable<VolunteerSocial>>;

    abstract volunteerContact(input: VolunteerByIdInput): Nullable<VolunteerContact> | Promise<Nullable<VolunteerContact>>;

    abstract volunteerPaymentOption(input: VolunteerByIdInput): Nullable<VolunteerPaymentOption> | Promise<Nullable<VolunteerPaymentOption>>;

    abstract profile(): Nullable<Volunteer> | Promise<Nullable<Volunteer>>;

    abstract requestedVolunteers(): Volunteer[] | Promise<Volunteer[]>;

    abstract backofficeToken(backofficeAuthId: string): Nullable<BackofficeTokenResponse> | Promise<Nullable<BackofficeTokenResponse>>;
}

export abstract class IMutation {
    abstract createProfile(input?: Nullable<CreateProfileInput>): Nullable<Volunteer> | Promise<Nullable<Volunteer>>;

    abstract updateProfile(input?: Nullable<UpdateProfileInput>): Nullable<Volunteer> | Promise<Nullable<Volunteer>>;

    abstract updateProfileV2(input?: Nullable<UpdateProfileV2Input>): Nullable<Volunteer> | Promise<Nullable<Volunteer>>;

    abstract hideProfile(input?: Nullable<HideProfileInput>): Nullable<Volunteer> | Promise<Nullable<Volunteer>>;

    abstract verifyVolunteer(id: string): Nullable<Volunteer> | Promise<Nullable<Volunteer>>;

    abstract rejectVolunteer(id: string): Nullable<Volunteer> | Promise<Nullable<Volunteer>>;

    abstract patchVolunteer(id: string, input: UpdateProfileV2Input): Nullable<Volunteer> | Promise<Nullable<Volunteer>>;

    abstract addActivity(input: AddActivityInput): Nullable<Activity> | Promise<Nullable<Activity>>;

    abstract addPaymentProvider(input: AddPaymentProviderInput): Nullable<PaymentProvider> | Promise<Nullable<PaymentProvider>>;

    abstract addSocialProvider(input: AddSocialProviderInput): Nullable<SocialProvider> | Promise<Nullable<SocialProvider>>;

    abstract addContactProvider(input: AddContactProviderInput): Nullable<ContactProvider> | Promise<Nullable<ContactProvider>>;
}

export class VolunteerResponse {
    volunteer?: Nullable<Volunteer>;
}

export class VolunteerSearchResponse {
    totalCount: number;
    startCursor?: Nullable<string>;
    edges: VolunteerSearchEdge[];
    pageInfo: PageInfo;
}

export class VolunteerSearchEdge {
    cursor: string;
    node: Volunteer;
}

export class PageInfo {
    endCursor?: Nullable<string>;
    hasNextPage: boolean;
}

export class Volunteer {
    id: string;
    firstName: string;
    lastName: string;
    description?: Nullable<string>;
    avatarUrl: string;
    organization?: Nullable<string>;
    verificationStatus: string;
    cityIds: string[];
    activityIds: string[];
    cities: City[];
    activities: Activity[];
    social: VolunteerSocial[];
    payments: VolunteerPaymentOption[];
    contacts?: Nullable<Nullable<VolunteerContact>[]>;
}

export class VolunteerContact {
    id: string;
    metadata: JSON;
    volunteerId: string;
    providerId: string;
    provider?: Nullable<ContactProvider>;
}

export class VolunteerPaymentOption {
    id: string;
    metadata: JSON;
    volunteerId: string;
    providerId: string;
    provider?: Nullable<PaymentProvider>;
}

export class VolunteerSocial {
    id: string;
    url: string;
    volunteerId: string;
    providerId: string;
    provider?: Nullable<SocialProvider>;
}

export class Activity {
    id: string;
    title: string;
    description: string;
}

export class City {
    id: string;
    title: string;
    adminName: string;
}

export class PaymentProvider {
    id: string;
    title: string;
}

export class SocialProvider {
    id: string;
    title: string;
}

export class ContactProvider {
    id: string;
    title: string;
}

export class BackofficeTokenResponse {
    token: string;
}

export type JSON = any;
type Nullable<T> = T | null;
