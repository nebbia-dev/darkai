import SideMenu from "@/app/components/SideMenu";

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
