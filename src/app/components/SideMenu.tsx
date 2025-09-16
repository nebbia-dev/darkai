'use client'
import {useState} from "react";
import {Drawer} from "@mui/material";
import Link from "next/link";
import {Menu} from '@/app/components/icons/Menu';

export default function SideMenu() {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    return (
        <>
            <aside className="w-[7.5vw] h-full bg-stone-200 fixed px-4 pt-8 flex justify-center items-start">
                <button onClick={toggleDrawer(true)} className="cursor-pointer">
                    <Menu/>
                </button>
            </aside>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <nav className="h-full w-[20vw] bg-stone-200 flex flex-col py-4 gap-[80%] justify-center">
                    <div className="flex flex-col">
                        <Link href="/admin/orders" className="py-2 px-12 hover:bg-slate-950 hover:text-gray-50">Orders</Link>
                        <Link href="/admin/configs" className="hover:bg-slate-950 hover:text-gray-50 py-2 px-12">Configurations</Link>
                    </div>
                    <Link href="/admin" className="underline py-2 px-12 hover:bg-slate-950 hover:text-gray-50">&larr; Logout</Link>
                </nav>
            </Drawer>
        </>
)
}