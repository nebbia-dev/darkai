import SideMenu from "@/app/_components/_layout/SideMenu";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="relative top-[72px]">
        <SideMenu/>
        {children}
    </div>
  );
}
