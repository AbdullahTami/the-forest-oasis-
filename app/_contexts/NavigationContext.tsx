"use client";
import React, { createContext, useContext, useState } from "react";

type NavigationType = {
  showNavbar: boolean;
  closeNavbar: () => void;
  openNavbar: () => void;
};

const NavigationContext = createContext<NavigationType | undefined>(undefined);

function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [showNavbar, setShowNavbar] = useState(false);
  const openNavbar = () => setShowNavbar(true);
  const closeNavbar = () => setShowNavbar(false);
  return (
    <NavigationContext.Provider value={{ showNavbar, closeNavbar, openNavbar }}>
      {children}
    </NavigationContext.Provider>
  );
}

function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined)
    throw new Error(
      "Context was used outside the navigation context provider."
    );
  return context;
}

export { NavigationProvider, useNavigation };
