import React from "react";

export default function AdminLayout({children,}: Readonly<{children: React.ReactNode}>) {
    return(
        <>
            <div id="header" className="cursor-auto w-[100vw] flex transition duration-500 justify-center relative z-25">
                <img className="py-6 w-[132px]" src="/logo.png" alt="darkai logo"/>
            </div>
            {children}
        </>
    )
}