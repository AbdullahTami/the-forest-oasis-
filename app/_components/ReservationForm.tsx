"use client";
import { User } from "next-auth";
import { type Cabin } from "../_lib/types";
import { useReservation } from "../_contexts/ReservationContext";
import Image from "next/image";
import { differenceInDays } from "date-fns";
import { createBooking } from "../_lib/actions";
import SubmitBtn from "./SubmitBtn";

type ReservationFormProps = {
  cabin: Cabin;
  user: User;
};

function ReservationForm({ cabin, user }: ReservationFormProps) {
  const { range, resetRange } = useReservation();
  const { id, maxCapacity, regularPrice, discount } = cabin;
  const startDate = range?.from;
  const endDate = range?.to;

  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    cabinId: id,
    startDate,
    endDate,
    numNights,
    cabinPrice,
  };

  const createBookingWithData = createBooking.bind(null, bookingData);
  return (
    <div className="scale-[1.01] ">
      <div className="bg-primary-800 text-primary-300 px-8 sm:px-16 sm:py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          {user?.image != null && (
            <Image
              // Important to display google profile images
              referrerPolicy="no-referrer"
              className="rounded-full"
              width={32}
              height={32}
              src={user.image}
              alt="user image"
            />
          )}

          <p>{user?.name}</p>
        </div>
      </div>

      <form
        // action={createBookingWithData}
        action={async (formData) => {
          await createBookingWithData(formData);
          resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            rows={4}
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitBtn pendingLabel="Reserving...">Reserve now</SubmitBtn>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
