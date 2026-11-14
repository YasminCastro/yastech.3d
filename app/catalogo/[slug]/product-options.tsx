"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { ColorStar, InstagramIcon } from "@/components/site/icons"
import { Window } from "@/components/site/window"
import { INSTAGRAM_DM, materiais, type Material, type Produto } from "@/lib/produtos"

export function Galeria({ fotos }: { fotos: Produto["fotos"] }) {
  const [i, setI] = useState(0)
  const atual = fotos[i]
  return (
    <Window title={atual.nome} className="min-w-0 flex-[1_1_440px] drop-lg" bodyClassName="flex flex-col gap-4 p-[18px]" aria-label="Fotos do produto">
      <div className="relative aspect-square overflow-hidden border-2 border-ink bg-white">
        <Image src={atual.src} alt={atual.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" priority className="object-cover" />
      </div>
      {fotos.length > 1 && (
        <div className="flex gap-3">
          {fotos.map((f, idx) => (
            <Toggle
              key={f.src}
              pressed={i === idx}
              onPressedChange={() => setI(idx)}
              aria-label={f.alt}
              className="relative size-24 overflow-hidden border-2 border-ink bg-white p-0 opacity-75 aria-pressed:opacity-100 aria-pressed:shadow-[0_0_0_3px_var(--color-violet)]"
            >
              <Image src={f.src} alt="" fill sizes="96px" className="object-cover" />
            </Toggle>
          ))}
        </div>
      )}
    </Window>
  )
}

export function Opcoes({ produto }: { produto: Produto }) {
  const [material, setMaterial] = useState<Material>("PLA")
  const [cor, setCor] = useState<string>("Preto")

  const escolherMaterial = (m: Material) => {
    setMaterial(m)
    if (!materiais[m].some((c) => c.nome === cor)) setCor(materiais[m][0].nome)
  }

  const mensagem = `Oi! Quero o ${produto.tag.toLowerCase()} ${produto.nome} na cor ${cor} (${material}).`

  return (
    <>
      <Window title="cores_disponiveis.exe" controls="none" barClassName="h-[34px]" bodyClassName="flex flex-col gap-4 p-[18px]">
        <div role="group" aria-label="Material" className="flex">
          {(Object.keys(materiais) as Material[]).map((m) => (
            <Toggle key={m} variant="bevel" size="touch" pressed={material === m} onPressedChange={() => escolherMaterial(m)} className="-mr-0.5 w-auto px-[22px] text-[17px]">
              {m}
            </Toggle>
          ))}
        </div>
        <div role="group" aria-label="Cor" className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2">
          {materiais[material].map((c) => (
            <Toggle
              key={c.nome}
              pressed={cor === c.nome}
              onPressedChange={() => setCor(c.nome)}
              className="min-h-12 justify-start gap-2.5 border-2 border-ink bg-white px-3 text-left font-pixel text-base text-ink aria-pressed:bg-lilac-soft aria-pressed:shadow-[inset_2px_2px_0_var(--color-bevel-shade),0_0_0_2px_var(--color-violet)]"
            >
              <ColorStar hex={c.hex} className="size-[26px]" />
              <span>{c.nome}</span>
            </Toggle>
          ))}
        </div>
        <span className="text-[15px] text-ink-soft">
          Selecionado: <strong>{cor} · {material}</strong>
        </span>
      </Window>

      <Button size="2xl" className="drop-md" nativeButton={false} render={<a href={INSTAGRAM_DM} />}>
        <InstagramIcon className="size-[22px]" />
        Pedir no Instagram
      </Button>
      <p className="border-2 border-dashed border-ink bg-lemon-cream px-3.5 py-3 text-[15px] leading-normal text-ink-soft">
        Na DM, manda: <em>“{mensagem}”</em>
      </p>
    </>
  )
}
