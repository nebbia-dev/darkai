import fetchPrices from "@/app/_helpers/_db-interactions/fetchPrices";
import Configurator from "@/app/_components/_layout/Configurator";
import React from "react";

export default async function Home() {
    const prices = await fetchPrices();

    return (
        <>
            <Configurator fetchedPrices={prices}/>

            {/*<div*/}
            {/*    className="font-sans opacity-100 w-[100vw] px-12 h-[100dvh] flex justify-center items-center absolute z-30 bg-black">*/}
            {/*    <div*/}
            {/*        className="opacity-100 flex flex-col justify-center items-center">*/}
            {/*        /!*<h1 className="font-bold text-gray-50 mx-auto text-4xl mb-4">DARKAI</h1>*!/*/}
            {/*        <img className="mb-4 w-[132px]" src="/darkai_white.webp" alt="darkai logo"/>*/}
            {/*        <p className="text-gray-50 text-center text-lg mb-10">*/}
            {/*            the world's first dental jewelry design interface*/}
            {/*        </p>*/}
            {/*        <div className="max-w-[80%] border border-white rounded-2xl px-8 py-6 text-gray-50 text-center text-lg">*/}
            {/*            <p className="w-full">The configurator is still under construction, it will be available soon</p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    );
}
