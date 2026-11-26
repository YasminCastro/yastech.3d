import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FolderIcon, HeartY2K, Sparkle, SparkleSolid } from "@/components/site/icons"
import { Window } from "@/components/site/window"

export const metadata: Metadata = {
  title: "Página não encontrada",
}

export default function NotFound() {
  return (
    <main className="bg-side-glow flex flex-1 items-center">
      <div className="mx-auto flex w-full max-w-[1280px] justify-center px-[clamp(16px,4vw,56px)] py-12 sm:py-20">
        <div className="relative w-full max-w-[640px]">
          <Window
            title="erro_404.exe"
            aria-labelledby="nf-t"
            className="relative z-10 bg-white/85 drop-lg"
            bodyClassName="flex flex-col items-center gap-4 p-6 text-center sm:gap-5 sm:p-[clamp(28px,5vw,56px)]"
          >
            <p aria-hidden="true" className="font-pixel text-[clamp(88px,26vw,160px)] leading-none font-bold text-violet">
              404
            </p>
            <h1 id="nf-t" className="flex flex-col">
              <span className="font-script text-[clamp(40px,11vw,64px)] leading-none text-ink">Ops!</span>
              <span className="font-pixel text-[22px] leading-[1.1] font-bold sm:text-[clamp(26px,3vw,34px)]">PÁGINA NÃO ENCONTRADA</span>
            </h1>
            <p className="max-w-[44ch] text-lg leading-[1.65] text-ink-soft">
              Parece que essa peça ainda não saiu da impressora. O link pode estar errado ou a página foi removida.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <Button size="lg" className="drop-sm" nativeButton={false} render={<Link href="/" />}>
                Voltar pro início
              </Button>
              <Button size="lg" variant="secondary" className="drop-sm" nativeButton={false} render={<Link href="/catalogo" />}>
                <FolderIcon className="size-5" />
                Ver catálogo
              </Button>
            </div>
          </Window>

          <HeartY2K id="hh404" className="absolute -bottom-6 -left-4 z-20 h-[60px] w-16 animate-float sm:-bottom-8 sm:-left-12 sm:h-[88px] sm:w-24" />
          <Sparkle id="ss404" to="#5B1FD6" className="absolute -top-6 -right-3 z-20 size-11 animate-float sm:-top-8 sm:-right-10 sm:size-16" />
          <SparkleSolid className="absolute -top-3 left-[12%] z-20 size-6 sm:size-[34px]" />
        </div>
      </div>
    </main>
  )
}
