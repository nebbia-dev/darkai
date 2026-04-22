'use client'
import {useState} from "react";
import OrderInfo from "@/app/_types/OrderInfo";
import {sendMail} from "@/lib/nodemailer/sendMail";
import updateOrderStatus from "@/app/_helpers/_db-interactions/updateOrderStatus";
import {buildOrderStatusEmail} from "@/app/_helpers/_emailers/buildOrderStatusEmail";

export default function Select({
    email,
    st,
    orderId,
    customerName,
    total,
}:{
    email:string,
    st:OrderInfo["status"],
    orderId:OrderInfo["id"],
    customerName?: string,
    total?: number,
}) {
    console.log('id ', orderId);
    async function updateStatus(newStatus:string) {
        try {
            await updateOrderStatus(orderId, newStatus)
            const orderStatusEmail = buildOrderStatusEmail({
                customerName,
                orderId,
                status: newStatus as Exclude<OrderInfo["status"], undefined>,
                total,
            });
            const mailResult = await sendMail({
                sendTo: email,
                subject: orderStatusEmail.subject,
                text: orderStatusEmail.text,
                html: orderStatusEmail.html,
            });

            if (!mailResult.ok) {
                console.error('Unable to send order status email', mailResult.error);
            }

            setStatus(newStatus);
        } catch (error) {
            console.error('Unable to update order status', error);
        }
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
