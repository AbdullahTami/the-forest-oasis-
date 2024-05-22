import React from "react";
import { type CabinType } from "@/app/_components/CabinCard";
import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";
import { FilterValues } from "../cabins/page";
// import { unstable_noStore as noStore } from "next/cache";

export default async function CabinsList({ filter }: { filter: FilterValues }) {
  // noStore();

  console.log(filter);

  const cabins: CabinType[] = await getCabins();

  if (!cabins.length) return null;

  let displayedCabins: CabinType[] = [];

  if (filter === "all") displayedCabins = cabins;

  if (filter === "small")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);

  if (filter === "medium")
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );

  if (filter === "large")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
