import { Suspense } from "react";
import CabinsList from "../_components/CabinsList";
import Spinner from "../_components/Spinner";

export const metadata = {
  title: "Cabins",
};

export const revalidate = 3600;

export type FilterValues = "all" | "large" | "medium" | "small";

export type SearchParams = {
  capacity: FilterValues;
};

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  console.log(searchParams);
  const filter = searchParams?.capacity ?? "all";
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <Suspense fallback={<Spinner />}>
        <CabinsList filter={filter} />
      </Suspense>
    </div>
  );
}
