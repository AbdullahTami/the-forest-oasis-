"use server";

import { User } from "next-auth";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { ExtendedUserType } from "./types";
import { getBookings } from "./data-service";

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

export async function deleteReservation(bookingId: number) {
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

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
