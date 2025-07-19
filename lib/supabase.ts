import { createClient, type SupabaseClient } from "@supabase/supabase-js"

// Las vars deben venir prefijadas con NEXT_PUBLIC_ para que el bundle las exponga al browser
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Si faltan, devolvemos null y avisamos en consola
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true
        }
      })
    : (console.warn(
        "⚠️  Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY.\n" +
          "Añádelas en los Environment Variables de tu proyecto Vercel / .env.local.",
      ),
      null)

// Tipos de la base de datos
export interface Usuario {
  id: string
  email: string
  nombre: string
  telefono?: string
  email_verificado: boolean
  telefono_verificado: boolean
  plan: "gratuito" | "premium"
  fecha_plan?: string
  publicaciones_mes: number
  ultima_publicacion?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Producto {
  id: string
  usuario_id: string
  titulo: string
  descripcion: string
  precio: number
  categoria_id: number
  estado: string
  ciudad: string
  codigo_postal?: string
  telefono_contacto?: string
  email_contacto?: string
  activo: boolean
  destacado: boolean
  vistas: number
  created_at: string
  updated_at: string
  categoria?: {
    nombre: string
    slug: string
  }
  imagenes?: ImagenProducto[]
  usuario?: {
    nombre: string
    telefono_verificado: boolean
  }
}

export interface ImagenProducto {
  id: string
  producto_id: string
  url: string
  orden: number
  created_at: string
}

export interface Categoria {
  id: number
  nombre: string
  slug: string
  icono?: string
  descripcion?: string
  activa: boolean
}
