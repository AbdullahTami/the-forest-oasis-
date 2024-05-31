"use client";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useNavigation } from "../_contexts/NavigationContext";
import { useOutsideClick } from "../_lib/hooks";
import { cn } from "../_lib/utils";

import {
  CalendarDaysIcon,
  HeartIcon,
  HomeModernIcon,
  Bars3BottomLeftIcon,
  ArrowLeftEndOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import SignOutButton from "./SignOutButton";

const navLinks = [
  {
    name: "Cabins",
    href: "/cabins",
    className:
      "hover:text-accent-400 transition-colors flex items-center gap-4",
    icon: <HomeModernIcon className="h-6 w-6 text-primary-600" />,
    credentialsRequired: false,
  },
  {
    name: "About",
    href: "/about",
    className:
      "hover:text-accent-400 transition-colors flex items-center gap-4",
    icon: <HeartIcon className="h-6 w-6 text-primary-600" />,
    credentialsRequired: false,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    className:
      "hover:text-accent-400 transition-colors flex items-center gap-4",
    icon: <CalendarDaysIcon className="h-6 w-6 text-primary-600" />,
    credentialsRequired: true,
  },
  {
    name: "Profile",
    href: "/account/profile",
    className:
      "hover:text-accent-400 transition-colors flex items-center gap-4",
    icon: <UserIcon className="h-6 w-6 text-primary-600" />,
    credentialsRequired: true,
  },
  //   {
  //     name: "Sign out",
  //     href: "/account/profile",
  //     className:
  //       "hover:text-accent-400 transition-colors flex items-center gap-4",
  //     icon: <UserIcon className="h-6 w-6 text-primary-600" />,
  //     credentialsRequired: true,
  //   },
];

export default function Navigation({ session }: { session: Session | null }) {
  const { showNavbar, openNavbar, closeNavbar } = useNavigation();
  const pathname = usePathname();
  const { ref } = useOutsideClick(closeNavbar, false);
  let renderedLinks = !session?.user
    ? navLinks.filter((link) => link.credentialsRequired !== true)
    : navLinks;

  return (
    <>
      <button
        className="absolute sm:hidden z-23 top-8 right-7"
        onClick={openNavbar}
      >
        <Bars3BottomLeftIcon width={32} height={32} />
      </button>
      <nav
        ref={ref}
        className={cn(
          "z-30 w-[230px] fixed top-0 transition duration-230 right-0 bg-slate-800 h-full text-xl sm:hidden block",
          showNavbar ? "translate-x-0" : "translate-x-[230px]"
        )}
      >
        <ul className="mt-9 px-2 h-full flex gap-7 flex-col">
          {renderedLinks.map((link) => {
            return (
              <li key={link.name} onClick={closeNavbar}>
                <Link
                  href={link.href}
                  className={cn(
                    link.className,
                    pathname === link.href && "text-accent-400"
                  )}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              </li>
            );
          })}

          {session?.user?.image != null ? (
            <>
              <li onClick={closeNavbar}>
                <SignOutButton />
              </li>
              <li className="mt-auto mb-12 flex items-center gap-4">
                <Image
                  className="rounded-full"
                  height={32}
                  width={32}
                  src={session?.user?.image}
                  alt="User image"
                  referrerPolicy="no-referrer"
                />
                <span>{session.user.name}</span>
              </li>
            </>
          ) : (
            <li onClick={closeNavbar}>
              <Link
                href="/account"
                className={cn(
                  "hover:text-accent-400 transition-colors flex items-center gap-4",
                  pathname === "/login" && "text-accent-400"
                )}
              >
                <ArrowLeftEndOnRectangleIcon className="h-6 w-6 text-primary-600" />
                <span>Login</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
