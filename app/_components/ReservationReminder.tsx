"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { useReservation } from "../_contexts/ReservationContext";

function ReservationReminder() {
  // CHANGE
  const { range, resetRange } = useReservation();

  if (!range?.from || !range?.to) return null;

  return (
    <div className="fixed flex-col sm:flex-row text-center bottom-6 left-1/2 -translate-x-1/2 py-2 px-3 sm:py-5 sm:px-8 sm:rounded-full rounded-sm bg-[rgb(198,153,99,91%)] text-primary-800 text  font-semibold shadow-xl shadow-slate-900 flex sm:gap-8 gap-2 items-center">
      <p>
        <span>👋</span> Don&apos;t forget to reserve your dates <br /> from{" "}
        {format(new Date(range.from), "MMM dd yyyy")} to{" "}
        {format(new Date(range.to), "MMM dd yyyy")}
      </p>
      <button
        className="rounded-full p-1 hover:bg-accent-600 transition-all"
        onClick={resetRange}
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

export default ReservationReminder;
