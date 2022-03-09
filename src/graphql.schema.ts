
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateVolunteerInput {
    name: string;
}

export class VolunteerByIdInput {
    id: string;
}

export class SearchInput {
    cityIds: string[];
    activityTypeIds: string[];
    paymentOptionIds: string[];
}

export abstract class IQuery {
    abstract cities(): Nullable<Nullable<City>[]> | Promise<Nullable<Nullable<City>[]>>;

    abstract activities(): Nullable<Nullable<VolunteerActivity>[]> | Promise<Nullable<Nullable<VolunteerActivity>[]>>;

    abstract socialProviders(): Nullable<Nullable<SocialProvider>[]> | Promise<Nullable<Nullable<SocialProvider>[]>>;

    abstract paymentProviders(): Nullable<Nullable<PaymentProvider>[]> | Promise<Nullable<Nullable<PaymentProvider>[]>>;

    abstract volunteersSearch(input?: Nullable<SearchInput>): Nullable<Nullable<Volunteer>[]> | Promise<Nullable<Nullable<Volunteer>[]>>;

    abstract volunteerById(input: VolunteerByIdInput): Nullable<Volunteer> | Promise<Nullable<Volunteer>>;
}

export abstract class IMutation {
    abstract createVolunteer(input?: Nullable<CreateVolunteerInput>): Nullable<Nullable<Volunteer>[]> | Promise<Nullable<Nullable<Volunteer>[]>>;
}

export class VolunteerResponse {
    volunteer?: Nullable<Volunteer>;
}

export class Volunteer {
    id: string;
    name: string;
    cities: City[];
    activities: VolunteerActivity[];
    social: VolunteerSocial[];
    payments: VolunteerPaymentOption[];
}

export class VolunteerPaymentOption {
    id: string;
    metadata: string;
}

export class VolunteerSocial {
    id: string;
    url: string;
}

export class VolunteerActivity {
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
