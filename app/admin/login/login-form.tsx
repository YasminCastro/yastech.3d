"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { entrar } from "../actions"

export function LoginForm() {
  const [estado, action, pendente] = useActionState(entrar, undefined)
  return (
    <form action={action} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 font-pixel text-lg font-bold">
        Senha
        <input
          type="password"
          name="senha"
          required
          autoFocus
          autoComplete="current-password"
          className="min-h-11 border-2 border-ink bg-white px-3 font-sans text-base font-normal"
        />
      </label>
      {estado?.erro && <p role="alert" className="text-destructive">{estado.erro}</p>}
      <Button type="submit" disabled={pendente}>{pendente ? "Entrando…" : "Entrar"}</Button>
    </form>
  )
}
