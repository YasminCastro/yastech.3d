import type { Metadata } from "next"
import { getProdutos } from "@/lib/store"
import { CatalogBrowser } from "./catalog-browser"

export const metadata: Metadata = {
  title: "Catálogo",
  description: "Capinhas de isqueiro, porta cigarro, chaveiros e peças aleatórias impressas em 3D.",
}

export default async function CatalogoPage() {
  const produtos = await getProdutos()
  return (
    <main className="bg-checker flex-1">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 px-[clamp(16px,4vw,56px)] pt-6 pb-16 sm:gap-8 sm:pt-10 sm:pb-24">
        <CatalogBrowser produtos={produtos} />
      </div>
    </main>
  )
}
