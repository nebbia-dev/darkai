'use server'
import {CookieOptions, createServerClient} from "@supabase/ssr";
import { cookies } from "next/headers";
import {readRuntimeEnv} from "@/lib/server/readRuntimeEnv";

/**
 * Especially important if using Fluid compute: Don't put this client in a
 * global variable. Always create a new client within each function when using
 * it.
 */
export async function createClient() {
    const cookieStore = await cookies();
    const supabaseServiceRoleKey = readRuntimeEnv(['NEXT', 'SUPABASE', 'SECRET', 'KEY']);

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        supabaseServiceRoleKey!,
        {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
                detectSessionInUrl: false,
            },
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet: any[]) {
                    try {
                        cookiesToSet.forEach(({ name, value, options } : { name:string, value:string, options:CookieOptions }) =>
                            cookieStore.set(name, value, options),
                        );
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have proxy refreshing
                        // user sessions.
                    }
                },
            },
        },
    );
}
