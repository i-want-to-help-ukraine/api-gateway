
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum DonateOptionType {
    bitcoin = "bitcoin",
    bankCard = "bankCard",
    westernUnion = "westernUnion"
}

export class AddDonateOptionRequest {
    id?: Nullable<string>;
    donateOptions?: Nullable<Nullable<DonateOptionInput>[]>;
}

export class SearchRequest {
    city?: Nullable<string>;
    activityTypes?: Nullable<string[]>;
    donateOptions?: Nullable<string[]>;
}

export class DonateOptionInput {
    type?: Nullable<DonateOptionType>;
    options?: Nullable<KeyValueInput[]>;
}

export class KeyValueInput {
    key?: Nullable<string>;
    value?: Nullable<string>;
}

export abstract class IQuery {
    abstract searchVolunteers(request?: Nullable<SearchRequest>): Nullable<Volunteer[]> | Promise<Nullable<Volunteer[]>>;
}

export abstract class IMutation {
    abstract updateDonateOptions(request: AddDonateOptionRequest): Nullable<AddDonateOptionResponse> | Promise<Nullable<AddDonateOptionResponse>>;
}

export class AddDonateOptionResponse {
    volunteer?: Nullable<Volunteer>;
}

export class Volunteer {
    id?: Nullable<string>;
    name?: Nullable<string>;
    activityTypes?: Nullable<Nullable<string>[]>;
    donateOptions?: Nullable<DonateOption[]>;
}

export class DonateOption {
    type?: Nullable<string>;
    options?: Nullable<KeyValue[]>;
}

export class KeyValue {
    key?: Nullable<string>;
    value?: Nullable<string>;
}

export class VolunteerActivityType {
    id?: Nullable<string>;
    title?: Nullable<string>;
}

type Nullable<T> = T | null;
