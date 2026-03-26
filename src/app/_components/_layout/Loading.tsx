'use client'
import React from "react";
import { Html} from '@react-three/drei'

export default function Loading() {
    return (
        <Html fullscreen>
            <div
                className="w-[100vw] h-[100dvh] flex flex-col justify-center items-center absolute z-30 bg-black px-12">
                <h1 className="font-bold text-gray-50 mx-auto text-4xl mb-4">DARKAI</h1>
                <p className="text-gray-50 text-center text-lg mb-10">
                    the world's first dental jewelry design interface
                </p>
                <span className="loader mb-8 inline-block mx-auto"></span>
            </div>
        </Html>
    )
}