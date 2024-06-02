import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "../_lib/actions";

function SignOutButton() {
  return (
    <form action={signOutAction} className="px-">
      <button className="sm:py-3 sm:px-5 sm:hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 sm:font-semibold sm:text-primary-200 w-full">
        <ArrowRightOnRectangleIcon className="sm:h-5 sm:w-5 w-6 h-6 text-primary-600" />
        <span>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
