
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

export class CreateVolunteerInput {
    firstname: string;
    lastname: string;
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
    metadata: string;
    paymentProviderId: string;
}

export class CreateVolunteerContact {
    metadata: string;
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

    abstract volunteersSearch(input?: Nullable<SearchInput>): Nullable<Nullable<Volunteer>[]> | Promise<Nullable<Nullable<Volunteer>[]>>;

    abstract volunteer(input: VolunteerByIdInput): Nullable<Volunteer> | Promise<Nullable<Volunteer>>;
}

export abstract class IMutation {
    abstract createVolunteer(input?: Nullable<CreateVolunteerInput>): Nullable<Volunteer> | Promise<Nullable<Volunteer>>;
}

export class VolunteerResponse {
    volunteer?: Nullable<Volunteer>;
}

export class Volunteer {
    id: string;
    firstname: string;
    lastname: string;
    verificationStatus: string;
    cities: City[];
    activities: Activity[];
    social: VolunteerSocial[];
    payments: VolunteerPaymentOption[];
    contacts?: Nullable<Nullable<VolunteerContact>[]>;
}

export class VolunteerContact {
    id: string;
    metadata: string;
    volunteerId: string;
}

export class VolunteerPaymentOption {
    id: string;
    metadata: string;
    volunteerId: string;
}

export class VolunteerSocial {
    id: string;
    url: string;
    volunteerId: string;
}

export class Activity {
    id: string;
    title: string;
}

export class City {
    id?: Nullable<string>;
    title?: Nullable<string>;
}

export class PaymentProvider {
    id?: Nullable<string>;
    title?: Nullable<string>;
}

export class SocialProvider {
    id?: Nullable<string>;
    title?: Nullable<string>;
}

type Nullable<T> = T | null;
