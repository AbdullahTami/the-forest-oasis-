import SignInButton from "../_components/SignInButton";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="flex flex-col sm:gap-10 gap-6 mt-10 items-center">
      <h2 className="sm:text-3xl text-xl  font-semibold">
        Sign in to access your guest area
      </h2>
      <SignInButton />
    </div>
  );
}
