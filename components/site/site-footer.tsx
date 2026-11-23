"use client"

import { usePathname } from "next/navigation"
import { INSTAGRAM_PERFIL } from "@/lib/produtos"

export function SiteFooter() {
  if (usePathname().startsWith("/studio")) return null
  return (
    <footer className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t-2 border-ink bg-lilac px-[clamp(16px,4vw,56px)] py-5 text-[15px] shadow-[inset_0_2px_0_#fff]">
      <a href={INSTAGRAM_PERFIL} target="_blank" rel="noopener noreferrer" className="font-pixel text-lg font-bold">
        YASTECH<span className="text-violet">.3D</span>
      </a>
      <span className="text-ink-muted">
        Site feito por{" "}
        <a href="https://www.yascastro.com.br/" target="_blank" rel="noopener noreferrer" className="underline">
          yascastro.com.br
        </a>
      </span>
    </footer>
  )
}
