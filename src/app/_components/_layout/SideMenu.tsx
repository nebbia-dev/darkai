'use client'
import {useState} from "react";
import {Drawer} from "@mui/material";
import Link from "next/link";
import {Menu} from '@/app/_components/_icons/Menu';
import {createClient} from "@/lib/supabase/client";
import {redirect} from "next/navigation";

export default function SideMenu() {
    const supabase = createClient();
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    async function logout() {
        await supabase.auth.signOut();
        redirect('/login');
    }

    return (
        <>
            <aside className="w-[7.5vw] h-full bg-gray-300 fixed px-4 pt-8 flex justify-center items-start">
                <button onClick={toggleDrawer(true)} className="cursor-pointer">
                    <Menu/>
                </button>
            </aside>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <nav className="h-full w-[20vw] bg-gray-300 flex flex-col pt-12 pb-4 gap-[80%] justify-center">
                    <div className="flex flex-col">
                        <Link href="/admin/orders" className="py-2 px-12 hover:bg-slate-950 hover:text-gray-50">Orders</Link>
                        <Link href="/admin/configs" className="hover:bg-slate-950 hover:text-gray-50 py-2 px-12">Configurations</Link>
                        <Link href="/admin/customers" className="hover:bg-slate-950 hover:text-gray-50 py-2 px-12">Customers</Link>

                    </div>
                    <button onClick={logout} type="button" className="cursor-pointer underline py-2 px-12 hover:bg-slate-950 hover:text-gray-50">&larr; Logout</button>
                </nav>
            </Drawer>
        </>
)
}