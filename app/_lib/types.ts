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