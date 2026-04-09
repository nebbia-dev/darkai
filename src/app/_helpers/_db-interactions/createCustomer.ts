'use server'
import {createClient} from "@/lib/supabase/server";
import PersonalData from "@/app/_types/PersonalData";

export default async function createCustomer(billingData:PersonalData) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('Customers')
        .insert({
            name: billingData.name,
            lastname: billingData.lastname,
            address: billingData.address,
            city: billingData.city,
            state: billingData.state,
            phone: billingData.phone,
            postalCode: billingData.postalCode,
            email: billingData.email
        })
        .select();
    return data;
}