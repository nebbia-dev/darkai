'use client'
import {useState} from "react";
import {Drawer} from "@mui/material";
import Link from "next/link";
import {Menu} from '@/app/components/icons/Menu.tsx';

export default function SideMenu() {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    return (
        <>
            <aside className="w-[10vw] fixed p-4">
                <button onClick={toggleDrawer(true)} className="cursor-pointer">
                    <Menu/>
                </button>
            </aside>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <nav className="h-full w-[20vw] flex items-end justify-center p-4">
                    <Link href="/admin" className="underline">&larr; Logout</Link>
                </nav>
            </Drawer>
        </>
)
}