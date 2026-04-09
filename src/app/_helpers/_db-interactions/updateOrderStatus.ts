'use server'
import {createClient} from "@/lib/supabase/serverSU";

export default async function updateOrderStatus(orderId:Number, newStatus:string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('Orders')
        .update({ status: newStatus })
        .eq('id', orderId)
}