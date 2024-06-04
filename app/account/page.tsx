import React from "react";
import { auth } from "../_lib/auth";
import Link from "next/link";

export const metadata = {
  title: "Guest area",
};

export default async function page() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0];
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 sm:mb-7">
        Welcome, {firstName}
      </h2>
      <p>
        View your{" "}
        <Link
          className="underline text-accent-500"
          href="/account/reservations"
        >
          reservations &rarr;
        </Link>
      </p>
    </div>
  );
}
