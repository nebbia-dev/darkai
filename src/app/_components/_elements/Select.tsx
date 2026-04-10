'use client'
import {useState} from "react";
import OrderInfo from "@/app/_types/OrderInfo";
import {sendMail} from "@/lib/nodemailer/sendMail";
import updateOrderStatus from "@/app/_helpers/_db-interactions/updateOrderStatus";

export default function Select({email, st, orderId}:{email:string, st:OrderInfo["status"], orderId:OrderInfo["id"]}) {
    console.log('id ', orderId);
    async function updateStatus(newStatus:string) {
        await updateOrderStatus(orderId, newStatus)
        // TODO:
        // - set Nodemailer to SEND the customer email telling her the order status has changed
        await sendMail({sendTo: email, subject:'Order status updated', text:'Your order has been updated. Current status: ' + newStatus} );
        setStatus(newStatus);
    }

    const [status, setStatus] = useState<string|undefined>(st);

    return(
        <select className="inline" value={status as string} onChange={(e) => updateStatus(e.target.value)}>
            <option value="In production">In production</option>
            <option value="New" disabled>New</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Canceled">Canceled</option>
        </select>
    )
}