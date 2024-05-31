import Navigation from "@/app/_components/Navigation";
import MobileNavigation from "@/app/_components/MobileNavigation";
import Logo from "@/app/_components/Logo";
import { auth } from "../_lib/auth";
import { NavigationProvider } from "../_contexts/NavigationContext";

async function Header() {
  const session = await auth();

  return (
    <header className="border-b border-primary-900 px-8 py-5">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <NavigationProvider>
          <Navigation />
          <MobileNavigation session={session} />
        </NavigationProvider>
      </div>
    </header>
  );
}

export default Header;
