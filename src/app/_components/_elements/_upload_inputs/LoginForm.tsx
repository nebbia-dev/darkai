'use client'
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {createClient} from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

type LoginProps = {
    user: User | null;
};

export default function LoginForm({user} : LoginProps) {
    const router = useRouter();
    const supabase = createClient();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isSending, setIsSending] = useState<boolean>(false);
    const [error, setError] = useState<string|undefined>();
    const [currentUser, setCurrentUser] = useState<User | null>(user);

    async function login(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSending(true);
        const { error, data } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) {
                setIsSending(false);
                setError(error.message);
            } else {
                router.push('/admin/orders')
            }
    }

    async function logout() {
        await supabase.auth.signOut();
        setCurrentUser(null);
    }

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setCurrentUser(session?.user ?? null);
            }
        );

        return () => {
            listener?.subscription.unsubscribe();
        };
    }, [supabase])

    return (
        <div className="w-[20vw] h-page-nav flex flex-col items-center justify-center mx-auto relative top-[36px]">
            {isSending
                ? <div className="w-full text-center">
                    <span className="loader mb-8 inline-block mx-auto"></span>
                    <h2 className="text-gray-950 mx-auto">Checking your credentials...</h2>
                </div>
                : !currentUser
                    ? <div className="rounded border flex flex-col items-center px-6 py-8 w-full">
                        <h2 className="font-bold text-2xl mb-4">Login</h2>
                        <form className="flex flex-col gap-2 px-2 pt-2 pb-4" onSubmit={login}>
                            <label>Email
                                <input className="w-full bg-stone-200 rounded py-2 px-4" value={email}
                                       type="email" onChange={(e) => setEmail(e.currentTarget.value)}
                                       required
                                />
                            </label>
                            <label>Password
                                <input className="w-full bg-stone-200 rounded py-2 px-4" value={password}
                                       type="password" onChange={(e) => setPassword(e.currentTarget.value)}
                                       required
                                />
                            </label>
                            <button
                                className="cursor-pointer py-2 px-4 rounded border bg-gray-950 text-gray-50 mt-4"
                                type="submit"
                            >Login &rarr;
                            </button>
                        </form>
                    </div>
                    : <div className="rounded border flex flex-col items-center px-6 py-8 w-full">
                        <h2 className="font-bold text-2xl mb-4">You're logged in!</h2>
                        <button
                            className="cursor-pointer py-2 px-4 rounded border bg-gray-950 text-gray-50 mt-4"
                            type="button"
                            onClick={logout}
                        >Logout &rarr;
                        </button>
                    </div>
            }
            {error &&
                <div
                    className="border-1 border-red-500 rounded-3xl w-[20vw] mx-auto bg-red-100 px-2 py-2 mt-4">
                    {error}
                </div>
            }
        </div>
    )
}