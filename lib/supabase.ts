import { createClient, type SupabaseClient } from "@supabase/supabase-js"

// Las vars deben venir prefijadas con NEXT_PUBLIC_ para que el bundle las exponga al browser
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Si faltan, devolvemos null y avisamos en consola
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : (console.warn(
        "⚠️  Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY.\n" +
          "Añádelas en los Environment Variables de tu proyecto Vercel / .env.local.",
      ),
      null)
