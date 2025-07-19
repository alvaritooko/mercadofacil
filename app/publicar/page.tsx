"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, X, Camera, Crown, Check } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

export default function PublicarPage() {
  const [imagenes, setImagenes] = useState<string[]>([])
  const [descripcion, setDescripcion] = useState<string>("")

  const agregarImagen = () => {
    // Simulamos agregar una imagen
    const nuevaImagen = `/placeholder.svg?height=200&width=200&text=Foto ${imagenes.length + 1}`
    setImagenes([...imagenes, nuevaImagen])
  }

  const eliminarImagen = (index: number) => {
    setImagenes(imagenes.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al inicio
            </Link>
            <h1 className="ml-6 text-xl font-semibold">Publicar Producto</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Crear Nueva Publicación</CardTitle>
            <CardDescription>
              Completa la información de tu producto para que otros usuarios puedan encontrarlo fácilmente
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Fotos */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Fotos del producto</Label>
              <p className="text-sm text-gray-600">Agrega hasta 5 fotos de tu producto</p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {imagenes.map((imagen, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={imagen || "/placeholder.svg"}
                      alt={`Foto ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => eliminarImagen(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}

                {imagenes.length < 5 && (
                  <button
                    onClick={agregarImagen}
                    className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-colors"
                  >
                    <Camera className="h-6 w-6 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Agregar foto</span>
                  </button>
                )}
              </div>
            </div>

            {/* Información básica */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título del producto *</Label>
                <Input id="titulo" placeholder="Ej: iPhone 13 Pro Max 256GB" className="w-full" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="precio">Precio *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <Input id="precio" type="number" placeholder="0" className="pl-8" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción * (máximo 250 caracteres)</Label>
              <Textarea
                id="descripcion"
                placeholder="Describe tu producto: estado, características, motivo de venta, etc."
                className="min-h-[120px]"
                maxLength={250}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
              <p className="text-xs text-gray-500">Caracteres restantes: {250 - (descripcion?.length || 0)}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="categoria">Categoría *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronica">Electrónica</SelectItem>
                    <SelectItem value="hogar">Hogar y Jardín</SelectItem>
                    <SelectItem value="ropa">Ropa y Accesorios</SelectItem>
                    <SelectItem value="deportes">Deportes</SelectItem>
                    <SelectItem value="vehiculos">Vehículos</SelectItem>
                    <SelectItem value="libros">Libros y Música</SelectItem>
                    <SelectItem value="otros">Otros</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estado">Estado del producto *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nuevo">Nuevo</SelectItem>
                    <SelectItem value="como-nuevo">Como nuevo</SelectItem>
                    <SelectItem value="buen-estado">Buen estado</SelectItem>
                    <SelectItem value="usado">Usado</SelectItem>
                    <SelectItem value="para-reparar">Para reparar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Ubicación */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="ciudad">Ciudad *</Label>
                <Input id="ciudad" placeholder="Ej: Buenos Aires, Córdoba..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="codigo-postal">Código Postal</Label>
                <Input id="codigo-postal" placeholder="Ej: 28001" />
              </div>
            </div>

            {/* Información de contacto */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Información de contacto</Label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input id="telefono" placeholder="+34 600 000 000" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-contacto">Email de contacto</Label>
                  <Input id="email-contacto" type="email" placeholder="tu@email.com" />
                </div>
              </div>
            </div>

            {/* Sección Premium */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Crown className="h-5 w-5 text-yellow-500 mr-2" />
                    ¿Quieres destacar tu publicación?
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Con el Plan Premium puedes publicar sin límites y destacar tus productos
                  </p>
                </div>
                <Link href="/planes">
                  <Button variant="outline" className="bg-yellow-500 text-white hover:bg-yellow-600 border-yellow-500">
                    Ver Planes
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center text-gray-700">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Publicaciones ilimitadas
                </div>
                <div className="flex items-center text-gray-700">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Aparece primero en búsquedas
                </div>
                <div className="flex items-center text-gray-700">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Hasta 5 fotos por producto
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button className="flex-1">
                <Upload className="h-4 w-4 mr-2" />
                Publicar Producto
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                Guardar como Borrador
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="text-xs text-gray-500 bg-gray-50 p-4 rounded-lg">
          <p className="font-medium mb-2">📋 Términos y Condiciones:</p>
          <ul className="space-y-1">
            <li>• Esta plataforma actúa únicamente como intermediario para conectar compradores y vendedores</li>
            <li>• No nos responsabilizamos por la calidad, autenticidad o legalidad de los productos publicados</li>
            <li>• Las transacciones se realizan directamente entre usuarios</li>
            <li>• Al publicar, aceptas nuestros términos de uso y política de privacidad</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
