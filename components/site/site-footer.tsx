import { INSTAGRAM_PERFIL } from "@/lib/produtos"

export function SiteFooter() {
  return (
    <footer className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t-2 border-ink bg-lilac px-[clamp(16px,4vw,56px)] py-5 text-[15px] shadow-[inset_0_2px_0_#fff]">
      <span className="font-pixel text-lg font-bold">
        YASTECH<span className="text-violet">.3D</span>
      </span>
      <span className="text-ink-muted">
        Impressões 3D sob encomenda · <a href={INSTAGRAM_PERFIL}>@yastech.3d</a>
      </span>
    </footer>
  )
}
