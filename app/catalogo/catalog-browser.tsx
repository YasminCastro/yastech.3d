"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { ProductCard } from "@/components/site/product-card"
import { Window } from "@/components/site/window"
import { categorias, type CategoriaId, type Produto } from "@/lib/produtos"

type Cat = CategoriaId | "todas"
type Faixa = "todas" | "ate10" | "10a20" | "mais20"
type Ordem = "padrao" | "menor" | "maior"

const faixas: { id: Faixa; label: string; teste: (v: number) => boolean }[] = [
  { id: "todas", label: "Todos os preços", teste: () => true },
  { id: "ate10", label: "Até R$ 10", teste: (v) => v <= 10 },
  { id: "10a20", label: "R$ 10 a R$ 20", teste: (v) => v > 10 && v <= 20 },
  { id: "mais20", label: "Acima de R$ 20", teste: (v) => v > 20 },
]

const ordens: { id: Ordem; label: string }[] = [
  { id: "padrao", label: "Destaques" },
  { id: "menor", label: "Menor preço" },
  { id: "maior", label: "Maior preço" },
]

function Grupo<T extends string>({
  titulo,
  opcoes,
  valor,
  onChange,
}: {
  titulo: string
  opcoes: { id: T; label: string; count?: number }[]
  valor: T
  onChange: (v: T) => void
}) {
  const id = `f-${titulo.toLowerCase()}`
  return (
    <div role="group" aria-labelledby={id} className="flex flex-col gap-2">
      <span id={id} className="font-pixel text-lg font-bold">{titulo}</span>
      <div className="flex flex-wrap gap-2 lg:flex-col">
        {opcoes.map((o) => (
          <Toggle key={o.id} variant="bevel" size="touch" className="max-lg:w-auto max-lg:px-3 max-lg:text-[15px]" pressed={valor === o.id} onPressedChange={() => onChange(o.id)}>
            <span>{o.label}</span>
            {o.count !== undefined && <span className="text-[13px] opacity-85">{o.count}</span>}
          </Toggle>
        ))}
      </div>
    </div>
  )
}

export function CatalogBrowser({ produtos }: { produtos: Produto[] }) {
  const [cat, setCat] = useState<Cat>("todas")
  const [faixa, setFaixa] = useState<Faixa>("todas")
  const [ordem, setOrdem] = useState<Ordem>("padrao")
  const [filtrosAbertos, setFiltrosAbertos] = useState(false)
  const ativos = Number(cat !== "todas") + Number(faixa !== "todas") + Number(ordem !== "padrao")

  const lista = useMemo(() => {
    const teste = faixas.find((f) => f.id === faixa)!.teste
    const r = produtos.filter((p) => (cat === "todas" || p.cat === cat) && teste(p.preco))
    if (ordem === "menor") r.sort((a, b) => a.preco - b.preco)
    if (ordem === "maior") r.sort((a, b) => b.preco - a.preco)
    return r
  }, [produtos, cat, faixa, ordem])

  const opcoesCat = [
    { id: "todas" as Cat, label: "Todas", count: produtos.length },
    ...categorias.map((c) => ({ id: c.id as Cat, label: c.label, count: produtos.filter((p) => p.cat === c.id).length })),
  ]

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-3 sm:gap-4">
        <div className="flex flex-col gap-1">
          <nav aria-label="Você está em" className="font-pixel text-[15px] text-ink-muted">
            <Link href="/" className="text-ink-muted">C:\Início</Link> \ Catálogo
          </nav>
          <h1 className="font-script text-[clamp(56px,16vw,64px)] leading-none font-normal sm:text-[clamp(64px,8vw,104px)]">Catálogo</h1>
        </div>
        <span aria-live="polite" className="border-2 border-ink bg-white px-3 py-1.5 font-pixel text-base sm:text-lg">
          {lista.length === 1 ? "1 produto" : `${lista.length} produtos`}
        </span>
      </div>

      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8">
        <Button
          variant="outline"
          className="justify-between lg:hidden"
          aria-expanded={filtrosAbertos}
          aria-controls="filtros"
          onClick={() => setFiltrosAbertos((v) => !v)}
        >
          <span>Filtros{ativos > 0 && ` (${ativos})`}</span>
          <span aria-hidden="true">{filtrosAbertos ? "▲" : "▼"}</span>
        </Button>
        <Window
          id="filtros"
          title="filtros.exe"
          controls="min-close"
          aria-label="Filtros"
          className={`max-w-full drop-md lg:block lg:w-[260px] lg:flex-none ${filtrosAbertos ? "" : "max-lg:hidden"}`}
          barClassName="h-9"
          bodyClassName="flex flex-col gap-5 p-4 lg:gap-6 lg:p-5"
        >
          <Grupo titulo="Categoria" opcoes={opcoesCat} valor={cat} onChange={setCat} />
          <Grupo titulo="Preço" opcoes={faixas} valor={faixa} onChange={setFaixa} />
          <Grupo titulo="Ordenar" opcoes={ordens} valor={ordem} onChange={setOrdem} />
          <Button
            variant="secondary"
            onClick={() => {
              setCat("todas")
              setFaixa("todas")
              setOrdem("padrao")
            }}
          >
            Limpar filtros
          </Button>
        </Window>

        <section aria-label="Produtos" className="min-w-0 flex-1">
          {lista.length === 0 && (
            <div className="flex flex-col items-center gap-3 border-2 border-ink bg-white px-6 py-14 text-center">
              <span className="font-pixel text-2xl">Nenhum produto encontrado</span>
              <span className="text-ink-muted">Tente outra categoria ou faixa de preço.</span>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] sm:gap-7">
            {lista.map((p, i) => (
              <ProductCard key={p.slug} produto={p} eager={i < 4} />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
