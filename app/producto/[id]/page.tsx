"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Heart, Share2, MapPin, Calendar, Eye, Mail, MessageCircle, Shield, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function ProductoPage({ params }: { params: { id: string } }) {
  const [imagenActual, setImagenActual] = useState(0)

  // Datos simulados del producto
  const producto = {
    id: params.id,
    titulo: "iPhone 13 Pro Max 256GB - Estado Impecable",
    precio: 850000,
    descripcion: `iPhone 13 Pro Max de 256GB en excelente estado. Usado por solo 8 meses, siempre con funda y protector de pantalla.

Incluye: iPhone, cargador original, cable Lightning, caja original, funda Apple y protector instalado.

Batería al 95%. Sin golpes ni rayones. Funciona perfectamente.

Motivo de venta: Cambio por modelo más reciente.`,
    categoria: "Electrónica",
    estado: "Como nuevo",
    ciudad: "Buenos Aires",
    codigoPostal: "1425",
    fechaPublicacion: "2024-01-15",
    vistas: 156,
    imagenes: [
      "/placeholder.svg?height=400&width=400&text=📱+iPhone+Frontal",
      "/placeholder.svg?height=400&width=400&text=📱+iPhone+Trasero",
      "/placeholder.svg?height=400&width=400&text=📱+iPhone+Lateral",
      "/placeholder.svg?height=400&width=400&text=📦+Accesorios",
      "/placeholder.svg?height=400&width=400&text=📋+Caja+Original",
    ],
    usuario: {
      nombre: "Carlos Mendoza",
      telefono: "+54 11 1234-5678",
      email: "carlos.m@email.com",
      verificado: true,
      calificacion: 4.8,
      ventasRealizadas: 23,
      fechaRegistro: "2023-05-10",
    },
  }

  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(precio)
  }

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a resultados
            </Link>
            <div className="ml-6 flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Guardar
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Compartir
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Galería de imágenes */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-square relative mb-4">
                  <Image
                    src={producto.imagenes[imagenActual] || "/placeholder.svg"}
                    alt={`${producto.titulo} - Imagen ${imagenActual + 1}`}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>

                <div className="p-4">
                  <div className="grid grid-cols-5 gap-2">
                    {producto.imagenes.map((imagen, index) => (
                      <button
                        key={index}
                        onClick={() => setImagenActual(index)}
                        className={`aspect-square relative rounded-lg overflow-hidden border-2 ${
                          imagenActual === index ? "border-blue-500" : "border-gray-200"
                        }`}
                      >
                        <Image
                          src={imagen || "/placeholder.svg"}
                          alt={`Miniatura ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Descripción */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Descripción</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-line text-gray-700">{producto.descripcion}</div>
              </CardContent>
            </Card>
          </div>

          {/* Información del producto y vendedor */}
          <div className="space-y-6">
            {/* Información básica */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{producto.titulo}</h1>
                    <p className="text-3xl font-bold text-green-600">{formatearPrecio(producto.precio)}</p>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {producto.ciudad}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatearFecha(producto.fechaPublicacion)}
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {producto.vistas} vistas
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Badge variant="secondary">{producto.categoria}</Badge>
                    <Badge variant="outline">{producto.estado}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Información del vendedor */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarFallback>
                      {producto.usuario.nombre
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  Vendedor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{producto.usuario.nombre}</span>
                    {producto.usuario.verificado && (
                      <Badge variant="secondary" className="text-green-600">
                        <Shield className="h-3 w-3 mr-1" />
                        Verificado
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      {producto.usuario.calificacion}
                    </div>
                    <span>{producto.usuario.ventasRealizadas} ventas</span>
                    <span>Desde {formatearFecha(producto.usuario.fechaRegistro)}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contactar por WhatsApp
                  </Button>

                  <Button variant="outline" className="w-full bg-transparent">
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar Email
                  </Button>
                </div>

                <div className="text-xs text-gray-500 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <p className="font-medium mb-1 text-yellow-800">⚠️ Importante:</p>
                  <ul className="space-y-1 text-yellow-700">
                    <li>• Esta plataforma solo conecta compradores y vendedores</li>
                    <li>• No nos responsabilizamos por las transacciones</li>
                    <li>• Verifica siempre el producto antes de pagar</li>
                    <li>• Reúnete en lugares públicos y seguros</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Productos relacionados */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Productos similares</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <Image
                      src={`/placeholder.svg?height=60&width=60&text=Producto${item}`}
                      alt={`Producto similar ${item}`}
                      width={60}
                      height={60}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">iPhone 14 Pro 128GB</p>
                      <p className="text-sm text-green-600 font-medium">{formatearPrecio(920000)}</p>
                      <p className="text-xs text-gray-500">Buenos Aires</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
