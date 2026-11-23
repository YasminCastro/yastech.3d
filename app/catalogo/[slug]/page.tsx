import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { FolderIcon } from "@/components/site/icons"
import { ProductCard } from "@/components/site/product-card"
import { Window } from "@/components/site/window"
import { categorias, formatarPreco } from "@/lib/produtos"
import { getProduto, getProdutos } from "@/lib/store"
import { Galeria, Opcoes } from "./product-options"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getProdutos()).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = await getProduto(slug)
  return p ? { title: p.nome, description: `${p.tag} ${p.nome} impresso em 3D sob encomenda.` } : {}
}

export default async function ProdutoPage({ params }: Props) {
  const { slug } = await params
  const [produto, produtos] = await Promise.all([getProduto(slug), getProdutos()])
  if (!produto) notFound()

  const categoria = categorias.find((c) => c.id === produto.cat)!
  const relacionados = produtos.filter((p) => p.slug !== produto.slug && p.fotos.length > 0).slice(0, 4)
  const descricao =
    produto.descricao ?? `${categoria.label.replace(/s$/, "")} ${produto.nome} impresso em 3D. Cada peça é feita sob encomenda na cor que você escolher.`

  const detalhes = [
    ["Tamanho", "[ALTURA] cm"],
    ["Prazo", "[X dias úteis]"],
    ["Entrega", "[Retirada / envio]"],
  ]

  return (
    <main className="bg-clouds-violet flex-1">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-14 px-[clamp(16px,4vw,56px)] pt-8 pb-24">
        <nav aria-label="Você está em" className="font-pixel text-base text-ink-muted">
          <Link href="/" className="text-ink-muted">C:\Início</Link> \ <Link href="/catalogo" className="text-ink-muted">Catálogo</Link> \ {categoria.label} \{" "}
          <span className="text-ink">{produto.nome}</span>
        </nav>

        <div className="flex flex-wrap items-start gap-10">
          {produto.fotos.length > 0 ? (
            <Galeria fotos={produto.fotos} />
          ) : (
            <Window title={produto.file} className="min-w-0 flex-[1_1_440px] drop-lg" bodyClassName="p-[18px]" aria-label="Fotos do produto">
              <div className="flex aspect-square flex-col items-center justify-center gap-2.5 border-2 border-ink bg-placeholder-lilac">
                <FolderIcon className="h-[46px] w-14" />
                <span className="border-2 border-ink bg-white px-2 py-0.5 font-pixel text-[15px]">FOTO EM BREVE</span>
              </div>
            </Window>
          )}

          <section aria-labelledby="prod-t" className="flex min-w-0 flex-[1_1_420px] flex-col gap-[22px]">
            <div className="flex flex-col items-start gap-2">
              <Badge className="px-2.5 py-[3px] text-[13px]">{produto.tag}</Badge>
              <h1 id="prod-t" className="font-pixel text-[clamp(44px,5vw,64px)] leading-none font-bold uppercase">{produto.nome}</h1>
              {produto.apelido && <span className="font-script text-[44px] leading-none text-violet">{produto.apelido}</span>}
            </div>
            <span className="text-4xl font-extrabold">{formatarPreco(produto.preco)}</span>
            <p className="max-w-[36em] text-lg leading-relaxed text-ink-soft">{descricao}</p>

            <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-2 border-ink bg-white px-[18px] py-4 text-base">
              {detalhes.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="font-pixel font-bold">{k}</dt>
                  <dd className="m-0">{v}</dd>
                </div>
              ))}
            </dl>

            <Opcoes produto={produto} />
          </section>
        </div>

        <section aria-labelledby="rel-t" className="flex flex-col gap-[22px]">
          <h2 id="rel-t" className="font-script text-[clamp(48px,5vw,68px)] leading-none font-normal">Você também vai amar</h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-7">
            {relacionados.map((p) => (
              <ProductCard key={p.slug} produto={p} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
