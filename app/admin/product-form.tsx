"use client"

import Link from "next/link"
import { useActionState } from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import { categorias, type Produto } from "@/lib/produtos"
import { salvarProduto } from "./actions"

const campo = "min-h-11 border-2 border-ink bg-white px-3 font-sans text-base font-normal"
const rotulo = "flex flex-col gap-1.5 font-pixel text-lg font-bold"

export function ProductForm({ produto }: { produto?: Produto }) {
  const [estado, action, pendente] = useActionState(salvarProduto, undefined)
  return (
    <form action={action} className="flex flex-col gap-5">
      <input type="hidden" name="slugOriginal" value={produto?.slug ?? ""} />

      <label className={rotulo}>
        Nome
        <input name="nome" required defaultValue={produto?.nome} className={campo} />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={rotulo}>
          Categoria
          <select name="cat" required defaultValue={produto?.cat ?? "capinhas"} className={campo}>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </label>
        <label className={rotulo}>
          Preço (R$)
          <input name="preco" required inputMode="decimal" defaultValue={produto?.preco} placeholder="15" className={campo} />
        </label>
      </div>

      <label className={rotulo}>
        Subtítulo
        <input name="sub" defaultValue={produto?.sub} placeholder="Chaveiro · PLA" className={campo} />
      </label>

      <label className={rotulo}>
        Apelido <span className="font-sans text-sm font-normal text-ink-muted">(frase curta em destaque, opcional)</span>
        <input name="apelido" defaultValue={produto?.apelido} className={campo} />
      </label>

      <label className={rotulo}>
        Descrição <span className="font-sans text-sm font-normal text-ink-muted">(opcional)</span>
        <textarea name="descricao" rows={4} defaultValue={produto?.descricao} className={`${campo} py-2`} />
      </label>

      <fieldset className="flex flex-col gap-3">
        <legend className="font-pixel text-lg font-bold">Fotos</legend>
        {produto && produto.fotos.length > 0 && (
          <ul className="flex flex-wrap gap-3">
            {produto.fotos.map((f) => (
              <li key={f.src}>
                <label className="flex cursor-pointer flex-col gap-1 border-2 border-ink bg-white p-1.5 text-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.src} alt={f.alt} className="size-24 object-cover" />
                  <span className="flex items-center gap-1.5">
                    <input type="checkbox" name="manter" value={f.src} defaultChecked /> Manter
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
        <input type="file" name="novas" multiple accept="image/jpeg,image/png,image/webp,image/gif" className="text-sm" />
        <span className="text-sm text-ink-muted">JPG, PNG, WEBP ou GIF, até 5 MB cada. A primeira foto é a capa.</span>
      </fieldset>

      {estado?.erro && <p role="alert" className="text-destructive">{estado.erro}</p>}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" size="lg" disabled={pendente}>{pendente ? "Salvando…" : "Salvar"}</Button>
        <Link href="/admin" className={buttonVariants({ variant: "outline", size: "lg" })}>Cancelar</Link>
      </div>
    </form>
  )
}
