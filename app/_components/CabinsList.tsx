import React from "react";
import { type CabinType } from "@/app/_components/CabinCard";
import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";
import { SearchParams } from "../cabins/page";
// import { unstable_noStore as noStore } from "next/cache";

export default async function CabinsList({ filter }: { filter: string }) {
  // noStore();

  console.log(filter);

  const cabins: CabinType[] = await getCabins();

  if (!cabins.length) return null;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
