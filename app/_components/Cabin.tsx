import Image from "next/image";
import React from "react";
import TextExpander from "./TextExpander";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import { type Cabin } from "../_lib/types";

export default function Cabin({ cabin }: { cabin: Cabin }) {
  const { name, maxCapacity, image, description } = cabin;
  return (
    <div className="sm:grid flex flex-col sm:grid-cols-[2fr_4fr] gap-8 sm:gap-20 border border-primary-800 sm:py-3 sm:px-10 mb-24">
      <div className="relative h-96 w-full sm:scale-[1.15] sm:-translate-x-3">
        <Image
          fill
          className="object-cover"
          src={image}
          alt={`Cabin ${name}`}
        />
        {/* Image Placeholder here. */}
      </div>

      <div className="px-5 sm:p-0">
        <h3 className="text-accent-100 font-black text-2xl sm:text-7xl sm:mb-5 sm:translate-x-[-254px] bg-primary-950 sm:p-6 pb-1 sm:w-[150%]">
          Cabin {name}
        </h3>

        <p className="text-lg text-primary-300 mb-10">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-2 sm:gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
