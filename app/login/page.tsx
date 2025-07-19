"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Mail, Lock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setMessage("")

    try {
      if (!supabase) {
        setError("Supabase no está configurado")
        return
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) {
        setError(error.message)
      } else {
        setMessage("¡Inicio de sesión exitoso!")
        // Redirigir al usuario
        window.location.href = "/"
      }
    } catch (err) {
      setError("Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setMessage("")

    try {
      if (!supabase) {
        setError("Supabase no está configurado")
        return
      }

      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            nombre: formData.nombre,
          },
        },
      })

      if (error) {
        setError(error.message)
      } else {
        setMessage("¡Cuenta creada! Revisa tu email para confirmar tu cuenta.")
      }
    } catch (err) {
      setError("Error al crear la cuenta")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {supabase ? (
        <div className="w-full max-w-md">
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al inicio
            </Link>
          </div>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{isLogin ? "Iniciar Sesión" : "Crear Cuenta"}</CardTitle>
              <CardDescription>
                {isLogin ? "Ingresa a tu cuenta para publicar y comprar" : "Crea tu cuenta para comenzar a vender"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {message && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">{message}</AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={isLogin ? handleLogin : handleSignUp} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre completo *</Label>
                    <Input
                      id="nombre"
                      placeholder="Tu nombre completo"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      required
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Tu contraseña"
                      className="pl-10"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      minLength={6}
                    />
                  </div>
                  {!isLogin && <p className="text-xs text-gray-500">Mínimo 6 caracteres</p>}
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Procesando..." : isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Separator />
              <div className="text-center text-sm">
                {isLogin ? (
                  <p>
                    ¿No tienes cuenta?{" "}
                    <button
                      onClick={() => {
                        setIsLogin(false)
                        setError("")
                        setMessage("")
                      }}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Regístrate aquí
                    </button>
                  </p>
                ) : (
                  <p>
                    ¿Ya tienes cuenta?{" "}
                    <button
                      onClick={() => {
                        setIsLogin(true)
                        setError("")
                        setMessage("")
                      }}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Inicia sesión
                    </button>
                  </p>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center p-8 text-center">
          <p className="max-w-sm text-red-600">
            No se encontraron las credenciales de Supabase. <br />
            Configura <strong>NEXT_PUBLIC_SUPABASE_URL</strong> y <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY</strong> en tu
            entorno antes de usar el login.
          </p>
        </div>
      )}
    </div>
  )
}

export default LoginPage
