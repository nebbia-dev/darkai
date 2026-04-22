'use server'
import {createClient} from "@/lib/supabase/serverSU";

export async function finalizeCheckout(orderId: number, configId: number) {
    const supabase = await createClient();

    const {error: orderError} = await supabase
        .from('Orders')
        .update({status: 'New'})
        .eq('id', orderId);

    if (orderError) {
        throw orderError;
    }

    const {error: configError} = await supabase
        .from('Configs')
        .update({orderStatus: 'Completed'})
        .eq('id', configId);

    if (configError) {
        throw configError;
    }
}
