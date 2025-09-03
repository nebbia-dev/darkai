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
                <nav className="h-full w-[20vw] bg-stone-200 flex items-end justify-center p-4">
                    <Link href="/admin" className="underline">&larr; Logout</Link>
                </nav>
            </Drawer>
        </>
)
}