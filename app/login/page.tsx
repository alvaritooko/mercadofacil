"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Mail, Lock, Phone, Shield, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [step, setStep] = useState(1) // 1: datos, 2: verificación email, 3: verificación teléfono, 4: captcha
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
  })
  const [verificationCodes, setVerificationCodes] = useState({
    email: "",
    telefono: "",
  })
  const [captchaVerified, setCaptchaVerified] = useState(false)

  const handleSubmitStep1 = (e: React.FormEvent) => {
    e.preventDefault()
    if (isLogin) {
      // Lógica de login
      console.log("Login:", formData)
    } else {
      setStep(2) // Ir a verificación de email
    }
  }

  const handleVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault()
    // Simular verificación de email
    console.log("Verificando email:", verificationCodes.email)
    setStep(3) // Ir a verificación de teléfono
  }

  const handleVerifyPhone = (e: React.FormEvent) => {
    e.preventDefault()
    // Simular verificación de teléfono
    console.log("Verificando teléfono:", verificationCodes.telefono)
    setStep(4) // Ir a captcha
  }

  const handleCaptcha = () => {
    // Simular captcha
    setCaptchaVerified(true)
    // Crear cuenta
    console.log("Cuenta creada exitosamente")
  }

  const sendEmailCode = () => {
    console.log("Enviando código a:", formData.email)
  }

  const sendPhoneCode = () => {
    console.log("Enviando SMS a:", formData.telefono)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al inicio
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {isLogin
                ? "Iniciar Sesión"
                : step === 1
                  ? "Crear Cuenta"
                  : step === 2
                    ? "Verificar Email"
                    : step === 3
                      ? "Verificar Teléfono"
                      : "Verificación de Seguridad"}
            </CardTitle>
            <CardDescription>
              {isLogin
                ? "Ingresa a tu cuenta para publicar y comprar"
                : step === 1
                  ? "Crea tu cuenta para comenzar a vender"
                  : step === 2
                    ? "Te hemos enviado un código a tu email"
                    : step === 3
                      ? "Te hemos enviado un SMS con el código"
                      : "Completa la verificación de seguridad"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Paso 1: Datos básicos */}
            {step === 1 && (
              <form onSubmit={handleSubmitStep1} className="space-y-4">
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

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="telefono"
                        placeholder="+57 300 000 0000"
                        className="pl-10"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                )}

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
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  {isLogin ? "Iniciar Sesión" : "Continuar"}
                </Button>
              </form>
            )}

            {/* Paso 2: Verificación de email */}
            {step === 2 && (
              <form onSubmit={handleVerifyEmail} className="space-y-4">
                <Alert>
                  <Mail className="h-4 w-4" />
                  <AlertDescription>
                    Hemos enviado un código de 6 dígitos a <strong>{formData.email}</strong>
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Label htmlFor="email-code">Código de verificación</Label>
                  <Input
                    id="email-code"
                    placeholder="000000"
                    maxLength={6}
                    value={verificationCodes.email}
                    onChange={(e) => setVerificationCodes({ ...verificationCodes, email: e.target.value })}
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    Verificar Email
                  </Button>
                  <Button type="button" variant="outline" onClick={sendEmailCode}>
                    Reenviar
                  </Button>
                </div>
              </form>
            )}

            {/* Paso 3: Verificación de teléfono */}
            {step === 3 && (
              <form onSubmit={handleVerifyPhone} className="space-y-4">
                <Alert>
                  <Phone className="h-4 w-4" />
                  <AlertDescription>
                    Hemos enviado un SMS con el código a <strong>{formData.telefono}</strong>
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Label htmlFor="phone-code">Código SMS</Label>
                  <Input
                    id="phone-code"
                    placeholder="000000"
                    maxLength={6}
                    value={verificationCodes.telefono}
                    onChange={(e) => setVerificationCodes({ ...verificationCodes, telefono: e.target.value })}
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    Verificar Teléfono
                  </Button>
                  <Button type="button" variant="outline" onClick={sendPhoneCode}>
                    Reenviar SMS
                  </Button>
                </div>
              </form>
            )}

            {/* Paso 4: Captcha */}
            {step === 4 && (
              <div className="space-y-4">
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>Por favor, completa la verificación de seguridad</AlertDescription>
                </Alert>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  {!captchaVerified ? (
                    <div>
                      <Shield className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 mb-4">Verificación de seguridad</p>
                      <Button onClick={handleCaptcha}>Verificar que no soy un robot</Button>
                    </div>
                  ) : (
                    <div className="text-green-600">
                      <CheckCircle className="h-12 w-12 mx-auto mb-4" />
                      <p className="font-medium">¡Verificación completada!</p>
                      <Button className="mt-4" onClick={() => console.log("Cuenta creada")}>
                        Crear Cuenta
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>

          {step === 1 && (
            <CardFooter className="flex flex-col space-y-4">
              <Separator />
              <div className="text-center text-sm">
                {isLogin ? (
                  <p>
                    ¿No tienes cuenta?{" "}
                    <button onClick={() => setIsLogin(false)} className="text-blue-600 hover:underline font-medium">
                      Regístrate aquí
                    </button>
                  </p>
                ) : (
                  <p>
                    ¿Ya tienes cuenta?{" "}
                    <button onClick={() => setIsLogin(true)} className="text-blue-600 hover:underline font-medium">
                      Inicia sesión
                    </button>
                  </p>
                )}
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  )
}
