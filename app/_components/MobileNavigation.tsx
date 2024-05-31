"use client";
import Link from "next/link";
import Image from "next/image";
import { cn } from "../_lib/utils";
import { Session } from "next-auth";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useNavigation } from "../_contexts/NavigationContext";
import { useOutsideClick } from "../_lib/hooks";
// import { useOutsideClick } from "../_lib/hooks";

export default function Navigation({ session }: { session: Session | null }) {
  const { showNavbar, openNavbar, closeNavbar } = useNavigation();
  const { ref } = useOutsideClick(closeNavbar);

  return (
    <>
      <button
        className="fixed md:hidden z-20 top-8 right-7"
        onClick={openNavbar}
      >
        <Bars3Icon width={30} height={30} />
      </button>
      <nav
        ref={ref}
        className={cn(
          "z-20 w-[200px] fixed top-0 transition right-0 bg-slate-800 h-full text-xl md:hidden block",
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
