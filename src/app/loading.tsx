import React from "react";

export default function Loading() {

    return (
        // <div className="w-[100vw] h-[100vh] flex flex-col justify-center align-center absolute z-30">
        //     <span className="loader mb-8 inline-block mx-auto"></span>
        //     <h2 className="text-gray-950 mx-auto">
        //         Loading...
        //     </h2>
        // </div>
        <div
            id="loader"
            className="font-sans opacity-100 transition duration-1500 w-[100vw] px-12 h-[100dvh] flex justify-center items-center absolute z-30 bg-black">
            <div
                className="opacity-100 transition duration-1000 flex flex-col justify-center items-center">
                <h1 className="font-bold text-gray-50 mx-auto text-4xl mb-4">DARKAI</h1>
                <p className="text-gray-50 text-center text-lg mb-10">
                    the world's first dental jewelry design interface
                </p>
                <span className="loader mb-8 inline-block mx-auto"></span>
            </div>
        </div>
    )
}