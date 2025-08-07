'use client'
import {FormEvent, useState} from "react";
import {useRouter} from "next/navigation";

export default function Page() {
    const router = useRouter();
    const[cred, setCred] = useState({user: '', pw: ''});
    const [isSending, setIsSending] = useState<boolean>(false);
    const [sent, setSent] = useState<boolean>(false);
    function login(e:FormEvent) {
        e.preventDefault();
        setIsSending(true);
        setTimeout(() => {
            setIsSending(false);
            setSent(true);
            router.push('/admin/orders');
        }, 1000)
    }

    return (
        <div className="w-[20vw] h-[calc(100vh-54px)] flex items-center justify-center mx-auto">
            {isSending
                ? <div className="w-full text-center">
                        <span className="loader mb-8 inline-block mx-auto"></span>
                        <h2 className="text-gray-950 mx-auto">Checking your credentials...</h2>
                    </div>
                : sent
                    ? <></>
                    : <div className="rounded border flex flex-col items-center px-6 py-8 w-full">
                        <h2 className="font-bold text-2xl mb-4">Login</h2>
                        <form className="flex flex-col gap-2 px-2 pt-2 pb-4" onSubmit={login}>
                            <label>Username
                                <input className="w-full bg-stone-200 rounded py-2 px-4" value={cred.user}
                                       type="text" onChange={(e) => setCred({...cred, user: e.target.value})}
                                       required
                                />
                            </label>
                            <label>Password
                                <input className="w-full bg-stone-200 rounded py-2 px-4" value={cred.pw}
                                       type="text" onChange={(e) => setCred({...cred, pw: e.target.value})}
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
            }
        </div>
    )
}