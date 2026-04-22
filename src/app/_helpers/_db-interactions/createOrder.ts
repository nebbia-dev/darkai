'use server'
import {createClient} from "@/lib/supabase/serverSU";
import PersonalData from "@/app/_types/PersonalData";

export default async function createOrder(
    userId:number,
    configId:number,
    total: number,
    shipping: PersonalData,
    status: string = 'New'
) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('Orders')
        .insert({
            shipping: true,
            total: total,
            status,
            shippingAddress: shipping,
            user_id:userId,
            config_id: configId
        })
        .select();

    if (error) {
        console.error('Unable to create order', error);
        throw new Error('Unable to create the order record');
    }

    return data;
}
