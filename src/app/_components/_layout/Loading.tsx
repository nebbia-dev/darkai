'use client'

import React from "react";

export default function Loading() {
    return (
        <div
            className="w-[100vw] h-[100vh] top-[-72px] flex flex-col justify-center items-center absolute z-30 bg-black">
            <img className="mb-16 w-[132px]" src="/darkai_white.webp" alt="darkai logo"/>
            <p className="text-gray-50 mx-auto text-lg mb-8">
                the world's first dental jewelry design interface
            </p>
            <span className="loader mb-8 inline-block mx-auto"></span>
        </div>
    )
}