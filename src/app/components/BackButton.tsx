'use client'
import Link from "next/link";
export default function BackButton({url} : {url:string}){
    return(
        <Link href={url} className="w-8 h-8 cursor-pointer rounded-full bg-gray-950 text-gray-50 px-[.2rem] pt-[.2rem] pb-[.3rem] flex items-center justify-center">&larr;</Link>
    )
}