import SideMenu from "@/app/_components/_layout/SideMenu";
import React from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div>
        <SideMenu/>
        {children}
    </div>
  );
}
