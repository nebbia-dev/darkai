'use client'
import {useState} from "react";
import OrderInfo from "@/app/types/OrderInfo";
import {createClient} from "@/utils/supabase/client";
import {sendMail} from "@/utils/nodemailer/sendMail";

export default function Select({st, orderId}:{st:OrderInfo["status"], orderId:OrderInfo["id"]}) {
    console.log('id ', orderId);
    async function updateStatus(newStatus:string) {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('Orders')
            .update({ status: newStatus })
            .eq('id', orderId)
        // TODO:
        // - set Nodemailer to SEND the customer email telling her the order status has changed
        await sendMail({sendTo: 'barbara.sandrolini@gmail.com', subject:'Order status updated', text:'Your order has been updated. Current status: ' + newStatus} );
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