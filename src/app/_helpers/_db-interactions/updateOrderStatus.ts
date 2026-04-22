'use server'
import {createClient} from "@/lib/supabase/serverSU";

export default async function updateOrderStatus(orderId:Number, newStatus:string) {
    const supabase = await createClient();
    const { error } = await supabase
        .from('Orders')
        .update({ status: newStatus })
        .eq('id', orderId)

    if (error) {
        console.error('Unable to update order status', error);
        throw new Error('Unable to update the order status');
    }
}
