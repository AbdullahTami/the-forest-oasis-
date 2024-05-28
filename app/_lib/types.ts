import { User } from "next-auth";

export type Cabin = {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description?: string;
  image: string;
};

export type Settings = {
  id: number;
  created_at: string;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestPerBooking: number;
  breakfastPrice: number;
};

export type Params = {
  cabinId: string;
};

export type ExtendedUserType = User & { guestId: number };

export type Guest = {
  id: number;
  created_at: Date;
  fullName: string;
  email: string;
  nationality?: string;
  nationalID?: string;
  countryFlag?: string;
};

export type Country = {
  name: string;
  iso2: string;
  flag: string;
  iso3: string;
};
