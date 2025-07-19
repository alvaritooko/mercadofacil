import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Producto, Categoria } from '@/lib/supabase'

export function useProducts() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar categorías
  const loadCategorias = async () => {
    if (!supabase) return

    try {
      const { data, error } = await supabase
        .from('categorias')
        .select('*')
        .eq('activa', true)
        .order('nombre')

      if (error) throw error
      setCategorias(data || [])
    } catch (err) {
      console.error('Error cargando categorías:', err)
      setError('Error cargando categorías')
    }
  }

  // Cargar productos
  const loadProductos = async (filtros?: {
    categoria?: string
    precioMin?: number
    precioMax?: number
    ciudad?: string
    estado?: string
    busqueda?: string
  }) => {
    if (!supabase) return

    try {
      setLoading(true)
      let query = supabase
        .from('productos')
        .select(`
          *,
          categoria:categorias(nombre, slug),
          usuario:usuarios(nombre, telefono_verificado),
          imagenes:imagenes_producto(url, orden)
        `)
        .eq('activo', true)
        .order('created_at', { ascending: false })

      // Aplicar filtros
      if (filtros?.categoria) {
        query = query.eq('categoria.slug', filtros.categoria)
      }
      if (filtros?.precioMin !== undefined) {
        query = query.gte('precio', filtros.precioMin)
      }
      if (filtros?.precioMax !== undefined) {
        query = query.lte('precio', filtros.precioMax)
      }
      if (filtros?.ciudad) {
        query = query.ilike('ciudad', `%${filtros.ciudad}%`)
      }
      if (filtros?.estado) {
        query = query.eq('estado', filtros.estado)
      }
      if (filtros?.busqueda) {
        query = query.or(`titulo.ilike.%${filtros.busqueda}%,descripcion.ilike.%${filtros.busqueda}%`)
      }

      const { data, error } = await query

      if (error) throw error
      setProductos(data || [])
    } catch (err) {
      console.error('Error cargando productos:', err)
      setError('Error cargando productos')
    } finally {
      setLoading(false)
    }
  }

  // Obtener producto por ID
  const getProducto = async (id: string) => {
    if (!supabase) return null

    try {
      const { data, error } = await supabase
        .from('productos')
        .select(`
          *,
          categoria:categorias(nombre, slug),
          usuario:usuarios(nombre, telefono_verificado),
          imagenes:imagenes_producto(url, orden)
        `)
        .eq('id', id)
        .eq('activo', true)
        .single()

      if (error) throw error
      return data
    } catch (err) {
      console.error('Error obteniendo producto:', err)
      setError('Error obteniendo producto')
      return null
    }
  }

  // Crear producto
  const createProducto = async (productoData: Omit<Producto, 'id' | 'created_at' | 'updated_at'>) => {
    if (!supabase) throw new Error('Supabase no está configurado')

    try {
      const { data, error } = await supabase
        .from('productos')
        .insert(productoData)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (err) {
      console.error('Error creando producto:', err)
      throw err
    }
  }

  // Incrementar vistas
  const incrementarVistas = async (productoId: string) => {
    if (!supabase) return

    try {
      const { error } = await supabase
        .from('productos')
        .update({ vistas: supabase.rpc('incrementar_vistas') })
        .eq('id', productoId)

      if (error) throw error
    } catch (err) {
      console.error('Error incrementando vistas:', err)
    }
  }

  useEffect(() => {
    loadCategorias()
    loadProductos()
  }, [])

  return {
    productos,
    categorias,
    loading,
    error,
    loadProductos,
    getProducto,
    createProducto,
    incrementarVistas,
    loadCategorias
  }
} 