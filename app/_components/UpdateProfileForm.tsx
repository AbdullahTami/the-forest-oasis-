"use client";
import React, { PropsWithChildren, useState } from "react";
import { Guest } from "../_lib/types";
import { updateGuest } from "../_lib/actions";
import SubmitBtn from "./SubmitBtn";

type UpdateProfileFormProps = PropsWithChildren<{
  guest: Guest;
}>;

export default function UpdateProfileForm({
  guest,
  children,
}: UpdateProfileFormProps) {
  const [count, setCount] = useState();

  const { fullName, email, nationalID, nationality, countryFlag } = guest;

  // CHANGE
  return (
    <form
      action={updateGuest}
      className="bg-primary-900 py-4 px-6 sm:py-8 sm:px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          defaultValue={fullName}
          name="fullName"
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          defaultValue={email}
          name="email"
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <img
            src={countryFlag}
            alt="Country flag"
            className="h-5 rounded-sm"
          />
        </div>
      </div>
      {children}
      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          defaultValue={nationalID}
          name="nationalID"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex sm:justify-end items-center gap-6">
        <SubmitBtn pendingLabel="Updating...">Update profile</SubmitBtn>
      </div>
    </form>
  );
}
