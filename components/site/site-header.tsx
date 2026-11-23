"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { InstagramIcon, Sparkle } from "@/components/site/icons"
import { INSTAGRAM_DM } from "@/lib/produtos"

const links = [
  { href: "/", label: "Início" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/sobre", label: "Sobre" },
]

export function SiteHeader() {
  const pathname = usePathname()
  if (pathname.startsWith("/studio")) return null
  const ativo = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href))

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink bg-lilac px-[clamp(16px,4vw,56px)] py-3 shadow-[inset_0_2px_0_#fff] sm:gap-4 sm:py-3.5">
        <Link href="/" className="flex items-center gap-2.5 text-ink no-underline hover:text-ink">
          <Sparkle id="lgLogo" className="size-[26px] sm:size-[30px]" />
          <span className="font-pixel text-[22px] font-bold tracking-[0.5px] sm:text-[26px]">
            YASTECH<span className="text-violet">.3D</span>
          </span>
        </Link>
        <nav aria-label="Principal" className="grid w-full grid-cols-[1fr_1fr_1fr_auto] items-center gap-1.5 sm:flex sm:w-auto sm:flex-wrap sm:gap-2">
          {links.map((l) => (
            <Button key={l.href} variant="outline" className="max-sm:px-2 max-sm:text-[15px]" nativeButton={false} render={<Link href={l.href} aria-current={ativo(l.href) ? "page" : undefined} />}>
              {l.label}
            </Button>
          ))}
          <Button aria-label="Pedir no Instagram" className="max-sm:px-3" nativeButton={false} render={<a href={INSTAGRAM_DM} target="_blank" rel="noopener noreferrer" />}>
            <InstagramIcon />
            <span className="hidden sm:inline">Pedir no Insta</span>
          </Button>
        </nav>
    </header>
  )
}
