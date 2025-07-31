import {createClient} from "@/utils/supabase/server";
export default async function Order({params}: { params: Promise<{ orderId: string[] }> }){
    const { orderId } = await params;
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('Orders')
        .select('id, config, shipping, created_at, status, shippingAddress, user_id(' +
            'name, lastname, address, city, postalCode, state, email, phone)')
        .eq('id', orderId);
    console.log(data)

    // TODO:
    // configs need a table of their own

    return(
        <div>
            <ul>
                <li>Customer: {data?.[0].user_id.name} {data?.[0].user_id.lastname}</li>
                <li>
                    <h3>Shipping information</h3>
                    {data?.[0].shipping &&
                        <ul>
                            <li>Address: {data?.[0].user_id.address}, {data?.[0].user_id.postalCode} {data?.[0].user_id.city}</li>
                            <li>Phone: {data?.[0].user_id.phone}</li>
                        </ul>
                    }
                </li>

            </ul>
        </div>
    )
}