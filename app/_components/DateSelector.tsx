"use client";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { type Cabin, type Settings } from "../_lib/types";
import { useReservation } from "../_contexts/ReservationContext";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";

function isAlreadyBooked(range: DateRange, datesArr: Date[]) {
  if (range?.to !== undefined && range?.from !== undefined) {
    return datesArr.some((date) =>
      // fixed internal date-fns library types annotation
      isWithinInterval(date, { start: range.from, end: range.to })
    );
  }
}

type DateSelectorProps = {
  settings: Settings;
  cabin: Cabin;
  bookedDates: Date[];
};

function DateSelector({ settings, cabin, bookedDates }: DateSelectorProps) {
  const { range, setRange, resetRange } = useReservation();

  const displayRange = isAlreadyBooked(range as DateRange, bookedDates)
    ? ({} as { to: undefined; from: undefined })
    : range;

  const { regularPrice, discount } = cabin;

  const numNights: number = differenceInDays(
    displayRange?.to,
    displayRange?.from
  );

  const cabinPrice = numNights * (regularPrice - discount);

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        selected={displayRange}
        onSelect={(range) => setRange(range)}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800  h-[50px] sm:h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 hidden sm:block px-3 py-2 sm:text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="sm:text-lg font-bold uppercase">Total</span>{" "}
                <span className="sm:text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="sm:border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
