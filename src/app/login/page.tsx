import {createClient} from "@/lib/supabase/server";
import LoginForm from "@/app/_components/_elements/_upload_inputs/LoginForm";

export default async function Page() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <LoginForm user={user}/>
    )
}