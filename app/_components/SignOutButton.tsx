import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "../_lib/actions";

function SignOutButton() {
  return (
    <form action={signOutAction} className="px-1">
      <button className="sm:py-3 sm:px-5 sm:hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 sm:font-semibold sm:text-primary-200 w-full">
        <ArrowRightOnRectangleIcon className="h-5 w-5 text-primary-600" />
        <span>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
