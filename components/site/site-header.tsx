"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { InstagramIcon, Sparkle } from "@/components/site/icons"
import { Marquee } from "@/components/site/marquee"
import { INSTAGRAM_DM } from "@/lib/produtos"

const links = [
  { href: "/", label: "Início" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/sobre", label: "Sobre e Encomendas" },
]

const faixas: Record<string, string[]> = {
  "/": ["YASTECH.3D", "IMPRESSÕES 3D SOB ENCOMENDA", "FEITO CAMADA POR CAMADA", "PEDIDOS PELO INSTAGRAM @YASTECH.3D"],
  "/catalogo": ["CATÁLOGO", "CAPINHAS DE ISQUEIRO", "PORTA CIGARRO", "CHAVEIROS", "ALEATÓRIOS"],
}

export function SiteHeader() {
  const pathname = usePathname()
  const ativo = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href))
  const faixa = faixas[pathname]

  return (
    <>
      {faixa && <Marquee items={faixa} />}
      <header className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-ink bg-lilac px-[clamp(16px,4vw,56px)] py-3.5 shadow-[inset_0_2px_0_#fff]">
        <Link href="/" className="flex items-center gap-2.5 text-ink no-underline hover:text-ink">
          <Sparkle id="lgLogo" className="size-[30px]" />
          <span className="font-pixel text-[26px] font-bold tracking-[0.5px]">
            YASTECH<span className="text-violet">.3D</span>
          </span>
        </Link>
        <nav aria-label="Principal" className="flex flex-wrap items-center gap-2">
          {links.map((l) => (
            <Button key={l.href} variant="outline" nativeButton={false} render={<Link href={l.href} aria-current={ativo(l.href) ? "page" : undefined} />}>
              {l.label}
            </Button>
          ))}
          <Button nativeButton={false} render={<a href={INSTAGRAM_DM} />}>
            <InstagramIcon />
            Pedir no Insta
          </Button>
        </nav>
      </header>
    </>
  )
}
