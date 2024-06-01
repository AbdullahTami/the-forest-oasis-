"use client";

import React, { PropsWithChildren } from "react";
import { FilterValues } from "../cabins/page";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "../_lib/utils";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter: FilterValues) {
    const params = new URLSearchParams(searchParams);
    console.log(params.toString());

    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        All cabins
      </Button>
      <Button
        filter="small"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        filter="medium"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        4&mdash;7 guests
      </Button>

      <Button
        filter="large"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

type ButtonProps = PropsWithChildren<{
  filter: FilterValues;
  handleFilter: (filter: FilterValues) => void;
  activeFilter: string;
}>;

function Button({ filter, handleFilter, activeFilter, children }: ButtonProps) {
  return (
    <button
      className={cn(
        "sm:px-5 px-3 py-2 hover:bg-primary-700",
        filter === activeFilter &&
          "bg-primary-700 text-primary-50 cursor-not-allowed"
      )}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
