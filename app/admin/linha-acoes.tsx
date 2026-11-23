"use client"

import Link from "next/link"
import { useTransition } from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import { excluirProduto, moverProduto } from "./actions"

export function LinhaAcoes({ slug, nome, primeiro, ultimo }: { slug: string; nome: string; primeiro: boolean; ultimo: boolean }) {
  const [pendente, start] = useTransition()
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="icon" aria-label={`Subir ${nome}`} disabled={pendente || primeiro} onClick={() => start(() => moverProduto(slug, -1))}>↑</Button>
      <Button variant="outline" size="icon" aria-label={`Descer ${nome}`} disabled={pendente || ultimo} onClick={() => start(() => moverProduto(slug, 1))}>↓</Button>
      <Link href={`/admin/${slug}`} className={buttonVariants({ variant: "secondary" })}>Editar</Link>
      <Button
        variant="destructive"
        disabled={pendente}
        onClick={() => {
          if (confirm(`Excluir "${nome}"? Isso não pode ser desfeito.`)) start(() => excluirProduto(slug))
        }}
      >
        Excluir
      </Button>
    </div>
  )
}
