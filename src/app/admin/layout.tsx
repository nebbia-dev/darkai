import React from "react";
import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";

export default async function AdminLayout({children}: Readonly<{children: React.ReactNode}>) {

    const supabase = await createClient();
    const { data, error } = await supabase.auth.getClaims();

    if (error || !data?.claims) {
        redirect("/login");
    }

    return(
        <>
            <div id="header" className="bg-white cursor-auto w-[100vw] flex transition duration-500 justify-center fixed z-25">
                <img className="py-6 w-[132px]" src="/logo.png" alt="darkai logo"/>
            </div>
            {children}
        </>
    )
}