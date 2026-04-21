'use server'
import {createClient} from "@/lib/supabase/serverSU";

export default async function updateCustomerScan(customerId:number, scan:string) {
    const supabase = await createClient();
    const {error} = await supabase
        .from('Customers')
        .update({scan})
        .eq('id', customerId);

    if (error) {
        throw error;
    }
}
