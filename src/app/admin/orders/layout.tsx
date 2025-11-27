import SideMenu from "@/app/_components/_layout/SideMenu";

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
