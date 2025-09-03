'use client'
import {useState} from "react";
import OrderInfo from "@/app/types/OrderInfo";

export default function Select({st}:{st:OrderInfo["status"]}) {
    const [status, setStatus] = useState<string>(st);

    return(
        <select className="inline" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="In preparation">In preparation</option>
            <option value="Ready">Ready</option>
            <option value="Shipped">Shipped</option>
            <option value="Picked Up">Picked up</option>
            <option value="Canceled">Canceled</option>
        </select>
    )
}