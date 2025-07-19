import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
}
