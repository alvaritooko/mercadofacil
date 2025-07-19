import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export default function Disclaimer() {
  return (
    <Alert className="bg-yellow-50 border-yellow-200 mb-8">
      <AlertTriangle className="h-4 w-4 text-yellow-600" />
      <AlertDescription className="text-yellow-800">
        <strong>Aviso Importante:</strong> MercadoFácil es una plataforma que conecta compradores y vendedores. No
        participamos en las transacciones ni nos responsabilizamos por la calidad, autenticidad o legalidad de los
        productos. Todas las negociaciones y transacciones son responsabilidad exclusiva de los usuarios.
      </AlertDescription>
    </Alert>
  )
}
