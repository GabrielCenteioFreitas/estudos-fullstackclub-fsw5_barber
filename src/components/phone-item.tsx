"use client"

import { SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

interface PhoneItemProps {
  phone: string
}

export const PhoneItem = ({ phone }: PhoneItemProps) => {
  const handleCopyPhoneClick = () => {
    navigator.clipboard.writeText(phone)
    toast.success("Telefone copiado com sucesso!")
  }

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <SmartphoneIcon />
        <p className="text-sm">{phone}</p>
      </div>

      <Button variant="outline" size="sm" onClick={handleCopyPhoneClick}>
        Copiar
      </Button>
    </div>
  )
}
