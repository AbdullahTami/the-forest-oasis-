"use client";
import {
  EllipsisHorizontalCircleIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { isPast } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import { useOutsideClick } from "../_lib/hooks";
import DeleteReservation from "./DeleteReservation";

type MenuProps = {
  startDate: string;
  bookingId: number;
  onDelete: (bookingId: number) => void;
};

export default function Menu({ startDate, bookingId, onDelete }: MenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { ref } = useOutsideClick(() => setIsMenuOpen(false));
  return (
    <div ref={ref} className={isPast(startDate) ? "hidden" : "block"}>
      <button
        onClick={() => setIsMenuOpen((open) => !open)}
        className="sm:hidden absolute top-1 right-1"
      >
        <EllipsisHorizontalCircleIcon className="h-6 w-6" />
      </button>
      {isMenuOpen && (
        <div className="absolute sm:hidden z-40 top-8 right-1 w-24 bg-slate-800">
          <Link
            href={`/account/reservations/edit/${bookingId}`}
            className="group flex items-center gap-2 sm:uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 py-[3px] hover:bg-accent-600 transition-colors hover:text-primary-900"
          >
            <PencilSquareIcon className="sm:h-5 sm:w-5 h-4 w-4 text-primary-600 group-hover:text-primary-800 transition-colors" />
            <span className="mt-1">Edit</span>
          </Link>
          <DeleteReservation onDelete={onDelete} bookingId={bookingId} />
        </div>
      )}
    </div>
  );
}
