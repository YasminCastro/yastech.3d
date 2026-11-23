import type { Metadata } from "next"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { Window } from "@/components/site/window"
import { exigirAdmin } from "@/lib/auth"
import { categorias, formatarPreco } from "@/lib/produtos"
import { getProdutos } from "@/lib/store"
import { sair } from "./actions"
import { LinhaAcoes } from "./linha-acoes"

export const metadata: Metadata = { title: "Admin · Catálogo", robots: { index: false } }
export const dynamic = "force-dynamic"

export default async function AdminPage() {
  await exigirAdmin()
  const produtos = await getProdutos()

  return (
    <main className="bg-checker flex-1">
      <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-6 px-[clamp(16px,4vw,56px)] pt-10 pb-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-script text-[clamp(56px,7vw,88px)] leading-none font-normal">Admin</h1>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/novo" className={buttonVariants({ variant: "default" })}>+ Novo produto</Link>
            <form action={sair}>
              <Button type="submit" variant="outline">Sair</Button>
            </form>
          </div>
        </div>

        <Window title="produtos.exe" controls="min-close" className="drop-md" bodyClassName="p-3">
          <p className="px-2 pb-3 text-sm text-ink-muted">
            A ordem daqui é a ordem em &ldquo;Destaques&rdquo; no catálogo. {produtos.length} produtos.
          </p>
          <ul className="flex flex-col gap-2">
            {produtos.map((p, i) => (
              <li key={p.slug} className="flex flex-wrap items-center gap-3 border-2 border-ink bg-white p-2">
                <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden border-2 border-ink bg-placeholder-lilac">
                  {p.fotos[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.fotos[0].src} alt="" className="size-full object-cover" />
                  ) : (
                    <span className="font-pixel text-[10px]">SEM FOTO</span>
                  )}
                </div>
                <div className="flex min-w-[160px] flex-1 flex-col">
                  <span className="font-pixel text-lg leading-tight font-semibold uppercase">{p.nome}</span>
                  <span className="text-sm text-ink-muted">
                    {categorias.find((c) => c.id === p.cat)?.label} · {p.fotos.length} foto(s)
                  </span>
                </div>
                <span className="font-extrabold">{formatarPreco(p.preco)}</span>
                <LinhaAcoes slug={p.slug} nome={p.nome} primeiro={i === 0} ultimo={i === produtos.length - 1} />
              </li>
            ))}
          </ul>
        </Window>
      </div>
    </main>
  )
}
