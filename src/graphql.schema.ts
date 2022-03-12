
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
    authId: string;
    firstName: string;
    lastName: string;
    description: string;
    organization: string;
    cityIds: string[];
    activityIds: string[];
    social: CreateVolunteerSocialInput[];
    paymentOptions: CreateVolunteerPaymentOptionInput[];
    contacts?: Nullable<CreateVolunteerContact[]>;
}

export class CreateVolunteerSocialInput {
    url: string;
    socialProviderId: string;
}

export class CreateVolunteerPaymentOptionInput {
    metadata: JSON;
    paymentProviderId: string;
}

export class CreateVolunteerContact {
    metadata: JSON;
    contactProviderId: string;
}

export class VolunteerByIdInput {
    id: string;
}

export class SearchInput {
    citiesIds?: Nullable<Nullable<string>[]>;
    activitiesIds?: Nullable<Nullable<string>[]>;
    paymentOptionsIds?: Nullable<Nullable<string>[]>;
}

export abstract class IQuery {
    abstract cities(): Nullable<Nullable<City>[]> | Promise<Nullable<Nullable<City>[]>>;

    abstract activities(): Nullable<Nullable<Activity>[]> | Promise<Nullable<Nullable<Activity>[]>>;

    abstract socialProviders(): Nullable<Nullable<SocialProvider>[]> | Promise<Nullable<Nullable<SocialProvider>[]>>;

    abstract paymentProviders(): Nullable<Nullable<PaymentProvider>[]> | Promise<Nullable<Nullable<PaymentProvider>[]>>;

    abstract contactProviders(): Nullable<Nullable<ContactProvider>[]> | Promise<Nullable<Nullable<ContactProvider>[]>>;

    abstract volunteersSearch(input?: Nullable<SearchInput>): Nullable<Nullable<Volunteer>[]> | Promise<Nullable<Nullable<Volunteer>[]>>;

    abstract volunteer(input: VolunteerByIdInput): Nullable<Volunteer> | Promise<Nullable<Volunteer>>;

    abstract profile(input: VolunteerByIdInput): Nullable<Volunteer> | Promise<Nullable<Volunteer>>;
}

export abstract class IMutation {
    abstract createProfile(input?: Nullable<CreateProfileInput>): Nullable<Volunteer> | Promise<Nullable<Volunteer>>;
}

export class VolunteerResponse {
    volunteer?: Nullable<Volunteer>;
}

export class Volunteer {
    id: string;
    firstName: string;
    lastName: string;
    description: string;
    organization: string;
    verificationStatus: string;
    cities: City[];
    activities: Activity[];
    social: VolunteerSocial[];
    payments: VolunteerPaymentOption[];
    contacts?: Nullable<Nullable<VolunteerContact>[]>;
}

export class VolunteerContact {
    id: string;
    metadata: JSON;
    volunteerId?: Nullable<string>;
}

export class VolunteerPaymentOption {
    id: string;
    metadata: JSON;
    volunteerId?: Nullable<string>;
    provider?: Nullable<PaymentProvider>;
}

export class VolunteerSocial {
    id: string;
    url: string;
    volunteerId?: Nullable<string>;
    provider?: Nullable<SocialProvider>;
}

export class Activity {
    id: string;
    title: string;
}

export class City {
    id: string;
    title: string;
}

export class PaymentProvider {
    id: string;
    title: string;
}

export class ContactProvider {
    id: string;
    title: string;
}

export class SocialProvider {
    id: string;
    title: string;
}

export type JSON = any;
type Nullable<T> = T | null;
