"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { DateRange } from "react-day-picker";

type ReservationType = {
  range: DateRange | undefined;
  setRange: Dispatch<SetStateAction<DateRange | undefined>>;
  resetRange: () => void;
};

const ReservationContext = createContext<ReservationType | undefined>(
  undefined
);

const initialState = {
  from: undefined,
  to: undefined,
};

function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = useState<DateRange | undefined>(initialState);

  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error(
      "Context was used outside the reservation context provider."
    );
  return context;
}

export { ReservationProvider, useReservation };
