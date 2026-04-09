import {createClient} from "@/lib/supabase/server";
import LoginForm from "@/app/_components/_elements/_upload_inputs/LoginForm";
import React from "react";

export default async function Page() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <>
        <div id="header"
             className="bg-white cursor-auto w-[100vw] flex transition duration-500 justify-center fixed z-25">
            <img className="py-6 w-[132px]" src="/logo.png" alt="darkai logo"/>
        </div>
        <LoginForm user={user}/>
        </>
)
}