import { auth } from "@clerk/nextjs/server";
import { CookieOptions, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClerkSupabaseClient() {
    const cookieStore = cookies();
    const { getToken } = auth();

    // "supabase" JWT template created in Clerk.com > Dashboard > Configure > JWT Templates
    // dashboard.clerk.com
    const token = await getToken({ template: "supabase" });
    const authToken = token ? { Authorization: `Bearer ${token}` } : null;

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_KEY!,
        {
            global: { headers: { "Cache-Control": "no-store", ...authToken } },
            cookies: {
                // Get the cookie
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                // Set the cookie
                set(name: string, value: string, options: CookieOptions) {
                    try {
                        cookieStore.set({ name, value, ...options });
                    } catch (error) {
                        console.error("Error setting cookie for Supabase client: ", error);
                        throw new Error("Error setting cookie for Supabase client");
                    }
                },
                // Remove the cookie
                remove(name: string, options: CookieOptions) {
                    try {
                        cookieStore.set({ name, value: "", ...options });
                    } catch (error) {
                        console.error("Error removing cookie for Supabase client: ", error);
                        throw new Error("Error removing cookie for Supabase client");
                    }
                },
            },
        }
    );
}