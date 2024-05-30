"use server";

import { User } from "next-auth";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { BookingData, ExtendedUserType } from "./types";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

// Extract country value
const getNationalityAndCountryFlag = (formData: FormData): [string, string] => {
  const country = formData.get("nationality");

  if (typeof country !== "string") {
    throw new Error("Expected nationality to be a string.");
  }
  const [nationality, countryFlag] = country.split("%");
  return [nationality, countryFlag];
};

// Check if user is logged in
async function getSession() {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  return session;
}

// Here goes the action

export async function updateGuest(formData: FormData) {
  const session = await getSession();
  const nationalID = formData.get("nationalID") as string;
  const [nationality, countryFlag] = getNationalityAndCountryFlag(formData);

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", (session.user as ExtendedUserType).guestId);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
}

export async function createBooking(
  bookingData: BookingData,
  formData: FormData
) {
  const session = await getSession();

  const newBooking = {
    ...bookingData,
    guestId: (session.user as ExtendedUserType).guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakFast: false,
    status: "unconfirmed",
  };

  console.log(newBooking);
}

export async function deleteBooking(bookingId: number) {
  // await new Promise((res) => setTimeout(res, 3000));
  // throw new Error("useOptimistic test");
  const session = await getSession();

  // extra security checks pertaining to user bookings
  const guestBookings = await getBookings(
    (session.user as ExtendedUserType).guestId
  );

  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
}

export async function updateBooking(formData: FormData) {
  // 1) Authentication
  const session = await getSession();

  // 2) Authorization
  const bookingId = Number(formData.get("bookingId"));
  const guestBookings = await getBookings(
    (session.user as ExtendedUserType).guestId
  );
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  // 3) Building update data
  const updateData = {
    numGuests: Number(formData.get("numGuests")) as number,
    observations: formData.get("observations")?.slice(0, 1000) as string,
  };

  // 4) Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  // 5) Error handling
  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  // 6)  Cache revalidation
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  // 7) Redirecting
  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
