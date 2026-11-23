import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Window } from "@/components/site/window"
import { exigirAdmin } from "@/lib/auth"
import { getProduto } from "@/lib/store"
import { ProductForm } from "../product-form"

export const metadata: Metadata = { title: "Editar produto", robots: { index: false } }

export default async function EditarPage({ params }: { params: Promise<{ slug: string }> }) {
  await exigirAdmin()
  const { slug } = await params
  const produto = await getProduto(slug)
  if (!produto) notFound()
  return (
    <main className="bg-checker flex-1">
      <div className="mx-auto w-full max-w-[720px] px-[clamp(16px,4vw,56px)] py-10 pb-24">
        <Window title={`${produto.slug}.exe`} controls="min-close" className="drop-md" bodyClassName="p-5">
          <ProductForm produto={produto} />
        </Window>
      </div>
    </main>
  )
}
