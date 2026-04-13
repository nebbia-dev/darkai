'use server'
import {createClient} from "@/lib/supabase/serverSU";

export async function finalizeCheckout(orderId: number, configId: number) {
    const supabase = await createClient();

    await supabase
        .from('Orders')
        .update({status: 'New'})
        .eq('id', orderId);

    await supabase
        .from('Configs')
        .update({orderStatus: 'Completed'})
        .eq('id', configId);
}
