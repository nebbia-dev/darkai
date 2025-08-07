'use client'
import Link from "next/link";
export default function BackButton(){
    return(
        <Link href="/admin/orders" className="cursor-pointer underline">&larr; Back</Link>
    )
}