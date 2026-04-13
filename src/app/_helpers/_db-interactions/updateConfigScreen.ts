'use server'
import {createClient} from "@/lib/supabase/serverSU";

export default async function updateConfigScreen(configId:number, screen:string) {
    const supabase = await createClient();
    const {error} = await supabase
        .from('Configs')
        .update({screen})
        .eq('id', configId);

    if (error) {
        throw error;
    }
}
