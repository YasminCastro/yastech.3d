"use client"

import Image from "next/image"
import { useState, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { ColorStar, InstagramIcon } from "@/components/site/icons"
import { Window } from "@/components/site/window"
import { INSTAGRAM_DM, type Material, type Produto } from "@/lib/produtos"

export function Galeria({ fotos }: { fotos: Produto["fotos"] }) {
  const [i, setI] = useState(0)
  const atual = fotos[i]
  return (
    <Window title={atual.nome} className="min-w-0 drop-lg" bodyClassName="flex flex-col gap-3 p-3 sm:gap-4 sm:p-[18px]" aria-label="Fotos do produto">
      <div className="relative aspect-square overflow-hidden border-2 border-ink bg-white">
        <Image src={atual.src} alt={atual.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" loading="eager" className="object-cover" />
      </div>
      {fotos.length > 1 && (
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {fotos.map((f, idx) => (
            <Toggle
              key={f.src}
              pressed={i === idx}
              onPressedChange={() => setI(idx)}
              aria-label={f.alt}
              className="relative size-16 overflow-hidden sm:size-24 border-2 border-ink bg-white p-0 opacity-75 aria-pressed:opacity-100 aria-pressed:shadow-[0_0_0_3px_var(--color-violet)]"
            >
              {/* eager: miniatura compartilha a src da foto principal; se ficasse lazy, o Next acusaria falso alerta de LCP */}
              <Image src={f.src} alt="" fill sizes="(min-width: 640px) 96px, 64px" loading="eager" className="object-cover" />
            </Toggle>
          ))}
        </div>
      )}
    </Window>
  )
}

/** Coluna da esquerda: foto + cores. Coluna da direita: informações (children) + botão de pedido. */
export function ProdutoDetalhe({ produto, foto, children }: { produto: Produto; foto: ReactNode; children: ReactNode }) {
  const porMaterial = (m: Material) => produto.cores.filter((c) => c.material === m)
  const disponiveis = (["PLA", "PETG"] as Material[]).filter((m) => porMaterial(m).length > 0)
  const [material, setMaterial] = useState<Material>(disponiveis[0] ?? "PLA")
  const [cor, setCor] = useState<string>(porMaterial(material)[0]?.nome ?? "")

  const escolherMaterial = (m: Material) => {
    setMaterial(m)
    if (!porMaterial(m).some((c) => c.nome === cor)) setCor(porMaterial(m)[0]?.nome ?? "")
  }

  const mensagem = `Oi! Quero o ${produto.tag.toLowerCase()} ${produto.nome} na cor ${cor} (${material}).`

  return (
    <div className="flex flex-wrap items-start gap-8 sm:gap-10">
      <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-5">
      {foto}
      <Window title="cores_disponiveis.exe" controls="none" barClassName="h-[30px]" bodyClassName="flex flex-col gap-3 p-3.5">
        {disponiveis.length > 1 && (
        <div role="group" aria-label="Material" className="flex">
          {disponiveis.map((m) => (
            <Toggle key={m} variant="bevel" pressed={material === m} onPressedChange={() => escolherMaterial(m)} className="-mr-0.5 w-auto px-4 text-[15px]">
              {m}
            </Toggle>
          ))}
        </div>
        )}
        <div role="group" aria-label={`Cores em ${material}`} className="flex flex-wrap gap-1.5">
          {porMaterial(material).map((c) => (
            <Toggle
              key={c.nome}
              pressed={cor === c.nome}
              onPressedChange={() => setCor(c.nome)}
              className="h-auto gap-1.5 border-2 border-ink bg-white py-1 pr-2.5 pl-1.5 font-pixel text-sm text-ink aria-pressed:bg-lilac-soft aria-pressed:shadow-[inset_2px_2px_0_var(--color-bevel-shade),0_0_0_2px_var(--color-violet)]"
            >
              <ColorStar hex={c.hex} hex2={c.hex2} className="size-[18px]" />
              {c.nome}
            </Toggle>
          ))}
        </div>
        <span className="text-sm text-ink-soft">
          Selecionado: <strong>{cor} · {material}</strong>
        </span>
      </Window>
      </div>

      <section aria-labelledby="prod-t" className="flex min-w-0 flex-[1_1_420px] flex-col gap-4 sm:gap-[22px]">
      {children}

      <Button size="2xl" className="drop-md max-sm:min-h-14 max-sm:px-4 max-sm:text-xl" nativeButton={false} render={<a href={INSTAGRAM_DM} />}>
        <InstagramIcon className="size-[22px]" />
        Pedir no Instagram
      </Button>
      <p className="border-2 border-dashed border-ink bg-lemon-cream px-3.5 py-3 text-[15px] leading-normal text-ink-soft">
        Na DM, manda: <em>“{mensagem}”</em>
      </p>
      </section>
    </div>
  )
}
