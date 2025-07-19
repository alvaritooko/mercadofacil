"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, Plus, User, Heart, Filter, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

// Importar el componente
import Disclaimer from "@/components/disclaimer"

export default function HomePage() {
  const [filtros, setFiltros] = useState({
    busqueda: "",
    categoria: "",
    precioMin: 0,
    precioMax: 1000000,
    ciudad: "",
    estado: "",
  })
  const [mostrarFiltros, setMostrarFiltros] = useState(false)
  const [productos, setProductos] = useState([
    {
      id: "1",
      titulo: "iPhone 13 Pro Max 256GB",
      precio: 850000,
      ubicacion: "Buenos Aires, Argentina",
      imagen: "/placeholder.svg?height=200&width=300&text=📱+iPhone",
      usuario: "Carlos M.",
      fechaPublicacion: "Hace 2 días",
      categoria: "Electrónica",
      estado: "Como nuevo",
      vistas: 45,
      destacado: true,
    },
    {
      id: "2",
      titulo: "Bicicleta de Montaña Trek",
      precio: 320000,
      ubicacion: "Córdoba, Argentina",
      imagen: "/placeholder.svg?height=200&width=300&text=🚴+Bicicleta",
      usuario: "Ana L.",
      fechaPublicacion: "Hace 1 día",
      categoria: "Deportes",
      estado: "Buen estado",
      vistas: 23,
      destacado: false,
    },
    {
      id: "3",
      titulo: "Sofá 3 Plazas Cuero",
      precio: 180000,
      ubicacion: "Rosario, Argentina",
      imagen: "/placeholder.svg?height=200&width=300&text=🛋️+Sofá",
      usuario: "Miguel R.",
      fechaPublicacion: "Hace 3 horas",
      categoria: "Hogar",
      estado: "Usado",
      vistas: 12,
      destacado: false,
    },
    {
      id: "4",
      titulo: "Laptop Gaming ASUS ROG",
      precio: 450000,
      ubicacion: "Mendoza, Argentina",
      imagen: "/placeholder.svg?height=200&width=300&text=💻+Laptop",
      usuario: "Laura P.",
      fechaPublicacion: "Hace 5 días",
      categoria: "Electrónica",
      estado: "Nuevo",
      vistas: 67,
      destacado: true,
    },
    {
      id: "5",
      titulo: "Mesa de Comedor Madera",
      precio: 95000,
      ubicacion: "La Plata, Argentina",
      imagen: "/placeholder.svg?height=200&width=300&text=🪑+Mesa",
      usuario: "David S.",
      fechaPublicacion: "Hace 1 semana",
      categoria: "Hogar",
      estado: "Buen estado",
      vistas: 18,
      destacado: false,
    },
    {
      id: "6",
      titulo: "Cámara Canon EOS R6",
      precio: 680000,
      ubicacion: "Mar del Plata, Argentina",
      imagen: "/placeholder.svg?height=200&width=300&text=📷+Cámara",
      usuario: "Elena F.",
      fechaPublicacion: "Hace 2 días",
      categoria: "Electrónica",
      estado: "Como nuevo",
      vistas: 34,
      destacado: false,
    },
    {
      id: "7",
      titulo: "Zapatillas Nike Air Max",
      precio: 85000,
      ubicacion: "Tucumán, Argentina",
      imagen: "/placeholder.svg?height=200&width=300&text=👟+Zapatillas",
      usuario: "Martín L.",
      fechaPublicacion: "Hace 4 días",
      categoria: "Ropa",
      estado: "Nuevo",
      vistas: 29,
      destacado: false,
    },
    {
      id: "8",
      titulo: "Guitarra Eléctrica Fender",
      precio: 220000,
      ubicacion: "Salta, Argentina",
      imagen: "/placeholder.svg?height=200&width=300&text=🎸+Guitarra",
      usuario: "Roberto C.",
      fechaPublicacion: "Hace 6 días",
      categoria: "Música",
      estado: "Buen estado",
      vistas: 41,
      destacado: false,
    },
    {
      id: "9",
      titulo: "Microondas Samsung 28L",
      precio: 65000,
      ubicacion: "Neuquén, Argentina",
      imagen: "/placeholder.svg?height=200&width=300&text=🔥+Microondas",
      usuario: "Patricia M.",
      fechaPublicacion: "Hace 1 semana",
      categoria: "Hogar",
      estado: "Como nuevo",
      vistas: 15,
      destacado: false,
    },
    {
      id: "10",
      titulo: "Tablet Samsung Galaxy Tab",
      precio: 120000,
      ubicacion: "Santa Fe, Argentina",
      imagen: "/placeholder.svg?height=200&width=300&text=📱+Tablet",
      usuario: "Gonzalo R.",
      fechaPublicacion: "Hace 3 días",
      categoria: "Electrónica",
      estado: "Usado",
      vistas: 22,
      destacado: false,
    },
  ])

  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(precio)
  }

  const filtrarProductos = () => {
    return productos.filter((producto) => {
      const cumpleBusqueda = producto.titulo.toLowerCase().includes(filtros.busqueda.toLowerCase())
      const cumpleCategoria = !filtros.categoria || producto.categoria === filtros.categoria
      const cumplePrecio = producto.precio >= filtros.precioMin && producto.precio <= filtros.precioMax
      const cumpleCiudad = !filtros.ciudad || producto.ubicacion.toLowerCase().includes(filtros.ciudad.toLowerCase())
      const cumpleEstado = !filtros.estado || producto.estado === filtros.estado

      return cumpleBusqueda && cumpleCategoria && cumplePrecio && cumpleCiudad && cumpleEstado
    })
  }

  const productosFiltrados = filtrarProductos()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">MercadoFácil</h1>
            </div>

            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar productos..."
                  className="pl-10 w-full"
                  value={filtros.busqueda}
                  onChange={(e) => setFiltros({ ...filtros, busqueda: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/publicar">
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Publicar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Búsqueda móvil */}
      <div className="md:hidden bg-white border-b p-4">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar productos..."
            className="pl-10 w-full"
            value={filtros.busqueda}
            onChange={(e) => setFiltros({ ...filtros, busqueda: e.target.value })}
          />
        </div>
        <Button variant="outline" size="sm" onClick={() => setMostrarFiltros(!mostrarFiltros)} className="w-full">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar de filtros */}
          <div className={`${mostrarFiltros ? "block" : "hidden"} md:block w-full md:w-80 space-y-6`}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Categoría</label>
                  <Select
                    value={filtros.categoria}
                    onValueChange={(value) => setFiltros({ ...filtros, categoria: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todas las categorías" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electrónica">Electrónica</SelectItem> {/* Updated value prop */}
                      <SelectItem value="Hogar">Hogar y Jardín</SelectItem> {/* Updated value prop */}
                      <SelectItem value="Ropa">Ropa y Accesorios</SelectItem> {/* Updated value prop */}
                      <SelectItem value="Deportes">Deportes</SelectItem> {/* Updated value prop */}
                      <SelectItem value="Vehículos">Vehículos</SelectItem> {/* Updated value prop */}
                      <SelectItem value="Libros">Libros y Música</SelectItem> {/* Updated value prop */}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Precio: {formatearPrecio(filtros.precioMin)} - {formatearPrecio(filtros.precioMax)}
                  </label>
                  <div className="px-2">
                    <Slider
                      value={[filtros.precioMin, filtros.precioMax]}
                      onValueChange={([min, max]) => setFiltros({ ...filtros, precioMin: min, precioMax: max })}
                      max={1000000}
                      min={0}
                      step={10000}
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Ciudad</label>
                  <Input
                    placeholder="Ej: Bogotá, Medellín..."
                    value={filtros.ciudad}
                    onChange={(e) => setFiltros({ ...filtros, ciudad: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Estado</label>
                  <Select value={filtros.estado} onValueChange={(value) => setFiltros({ ...filtros, estado: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Cualquier estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nuevo">Nuevo</SelectItem> {/* Updated value prop */}
                      <SelectItem value="Como nuevo">Como nuevo</SelectItem> {/* Updated value prop */}
                      <SelectItem value="Buen estado">Buen estado</SelectItem> {/* Updated value prop */}
                      <SelectItem value="Usado">Usado</SelectItem> {/* Updated value prop */}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() =>
                    setFiltros({
                      busqueda: "",
                      categoria: "",
                      precioMin: 0,
                      precioMax: 1000000,
                      ciudad: "",
                      estado: "",
                    })
                  }
                >
                  Limpiar filtros
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contenido principal */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {productosFiltrados.length === productos.length ? "Productos Recientes" : "Resultados de búsqueda"}
              </h2>
              <Badge variant="secondary" className="text-sm">
                {productosFiltrados.length} productos encontrados
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {productosFiltrados.map((producto) => (
                <Link key={producto.id} href={`/producto/${producto.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardHeader className="p-0">
                      <div className="relative">
                        <Image
                          src={producto.imagen || "/placeholder.svg"}
                          alt={producto.titulo}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        {producto.destacado && (
                          <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">⭐ Destacado</Badge>
                        )}
                        <Button variant="ghost" size="sm" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 flex-1">
                      <CardTitle className="text-lg mb-2 line-clamp-2">{producto.titulo}</CardTitle>
                      <div className="space-y-2">
                        <p className="text-2xl font-bold text-green-600">{formatearPrecio(producto.precio)}</p>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-3 w-3 mr-1" />
                          {producto.ubicacion}
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Por {producto.usuario}</span>
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {producto.fechaPublicacion}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {producto.categoria}
                          </Badge>
                          <span className="text-xs text-gray-500">{producto.vistas} vistas</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {productosFiltrados.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron productos</h3>
                <p className="text-gray-600 mb-4">Intenta ajustar tus filtros de búsqueda</p>
                <Button
                  variant="outline"
                  onClick={() =>
                    setFiltros({
                      busqueda: "",
                      categoria: "",
                      precioMin: 0,
                      precioMax: 1000000,
                      ciudad: "",
                      estado: "",
                    })
                  }
                >
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Disclaimer />

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 MercadoFácil. Todos los derechos reservados.</p>
            <p className="text-sm mt-2">Plataforma de conexión entre compradores y vendedores</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
