import React from "react";
import SideNavigation from "../_components/SideNavigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid sm:grid-cols-[16rem_1fr] h-full sm:gap-12">
      <div>
        <SideNavigation />
      </div>
      <div className="pt-1">{children}</div>
    </div>
  );
}
