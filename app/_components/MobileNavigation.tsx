"use client";
import { Bars3BottomLeftIcon } from "@heroicons/react/16/solid";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useNavigation } from "../_contexts/NavigationContext";
import { useOutsideClick } from "../_lib/hooks";
import { cn } from "../_lib/utils";

export default function Navigation({ session }: { session: Session | null }) {
  const { showNavbar, openNavbar, closeNavbar } = useNavigation();
  const { ref } = useOutsideClick(closeNavbar, false);

  return (
    <>
      <button
        className="fixed md:hidden z-20 top-8 right-7"
        onClick={openNavbar}
      >
        <Bars3BottomLeftIcon width={32} height={32} />
      </button>
      <nav
        ref={ref}
        className={cn(
          "z-20 w-[200px] fixed top-0 transition duration-300 right-0 bg-slate-800 h-full text-xl md:hidden block",
          showNavbar ? "translate-x-0" : "translate-x-[200px]"
        )}
      >
        <ul className="mt-9 px-2 flex gap-4 flex-col">
          <li>
            <Link
              href="/cabins"
              className="hover:text-accent-400 transition-colors"
            >
              Cabins
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-accent-400 transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            {session?.user?.image != null ? (
              <Link
                href="/account"
                className="hover:text-accent-400 transition-colors flex items-center gap-4"
              >
                <Image
                  className="rounded-full"
                  height={32}
                  width={32}
                  src={session?.user?.image}
                  alt="User image"
                  referrerPolicy="no-referrer"
                />
                <span>Guest area</span>
              </Link>
            ) : (
              <Link
                href="/account"
                className="hover:text-accent-400 transition-colors"
              >
                Guest area
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}
