"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check, Star, Zap, Crown } from "lucide-react"
import Link from "next/link"

export default function PlanesPage() {
  const planes = [
    {
      nombre: "Gratuito",
      precio: 0,
      descripcion: "Perfecto para empezar a vender",
      icono: <Star className="h-8 w-8 text-blue-500" />,
      caracteristicas: [
        "1 publicación por semana",
        "Hasta 3 fotos por producto",
        "Soporte básico por email",
        "Perfil básico",
        "Búsqueda estándar",
      ],
      limitaciones: ["Máximo 4 publicaciones al mes", "Sin destacar publicaciones", "Sin estadísticas avanzadas"],
      popular: false,
    },
    {
      nombre: "Premium",
      precio: 15000,
      descripcion: "Para vendedores serios sin límites",
      icono: <Crown className="h-8 w-8 text-yellow-500" />,
      caracteristicas: [
        "Publicaciones ilimitadas",
        "Hasta 5 fotos por producto",
        "Publicaciones destacadas",
        "Estadísticas avanzadas",
        "Soporte prioritario 24/7",
        "Perfil verificado",
        "Aparece primero en búsquedas",
        "Sin anuncios",
        "Herramientas de vendedor profesional",
      ],
      limitaciones: [],
      popular: true,
    },
  ]

  const formatearPrecio = (precio: number) => {
    if (precio === 0) return "Gratis"
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(precio)
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
            <h1 className="ml-6 text-xl font-semibold">Planes y Precios</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Elige el plan perfecto para ti</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comienza gratis y actualiza cuando necesites más funciones para hacer crecer tu negocio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {planes.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? "border-2 border-yellow-400 shadow-lg" : ""}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white">
                  ⭐ Más Popular
                </Badge>
              )}

              <CardHeader className="text-center pb-8">
                <div className="flex justify-center mb-4">{plan.icono}</div>
                <CardTitle className="text-2xl">{plan.nombre}</CardTitle>
                <CardDescription className="text-base">{plan.descripcion}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{formatearPrecio(plan.precio)}</span>
                  {plan.precio > 0 && <span className="text-gray-600 ml-2">/mes</span>}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Incluye:
                  </h4>
                  <ul className="space-y-2">
                    {plan.caracteristicas.map((caracteristica, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{caracteristica}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.limitaciones.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Limitaciones:</h4>
                    <ul className="space-y-2">
                      {plan.limitaciones.map((limitacion, i) => (
                        <li key={i} className="flex items-start text-gray-600">
                          <span className="mr-2">•</span>
                          <span>{limitacion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>

              <CardFooter>
                <Button
                  className={`w-full ${plan.popular ? "bg-yellow-500 hover:bg-yellow-600" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.precio === 0 ? "Comenzar Gratis" : "Actualizar a Premium"}
                  {plan.popular && <Zap className="h-4 w-4 ml-2" />}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Información adicional */}
        <div className="mt-16 bg-white rounded-lg p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-center mb-8">Preguntas Frecuentes</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-2">¿Puedo cambiar de plan en cualquier momento?</h4>
              <p className="text-gray-600">
                Sí, puedes actualizar o cancelar tu plan cuando quieras. Los cambios se aplican inmediatamente.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">¿Qué métodos de pago aceptan?</h4>
              <p className="text-gray-600">
                Aceptamos tarjetas de crédito, débito, PSE, Nequi, Daviplata y transferencias bancarias.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">¿Hay permanencia mínima?</h4>
              <p className="text-gray-600">
                No, puedes cancelar tu suscripción en cualquier momento sin penalizaciones.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">¿Qué pasa si no uso todas mis publicaciones?</h4>
              <p className="text-gray-600">
                Con el plan Premium tienes publicaciones ilimitadas. Con el plan gratuito, las publicaciones no
                utilizadas no se acumulan.
              </p>
            </div>
          </div>
        </div>

        {/* Métodos de pago */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-6">Métodos de pago seguros</h3>
          <div className="flex justify-center items-center space-x-6 text-gray-400">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <span className="font-semibold">VISA</span>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <span className="font-semibold">Mastercard</span>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <span className="font-semibold">Mercado Pago</span>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <span className="font-semibold">Transferencia</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
