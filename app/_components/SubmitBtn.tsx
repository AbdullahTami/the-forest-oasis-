"use client";

import { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

type SubmitBtnProps = PropsWithChildren<{
  pendingLabel: string;
}>;

export default function SubmitBtn({ children, pendingLabel }: SubmitBtnProps) {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-accent-500 sm:w-auto w-full px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
