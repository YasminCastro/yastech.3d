import type { Metadata } from "next"
import { CatalogBrowser } from "./catalog-browser"

export const metadata: Metadata = {
  title: "Catálogo",
  description: "Capinhas de isqueiro, porta cigarro, chaveiros e peças aleatórias impressas em 3D.",
}

export default function CatalogoPage() {
  return (
    <main className="bg-checker flex-1">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-8 px-[clamp(16px,4vw,56px)] pt-10 pb-24">
        <CatalogBrowser />
      </div>
    </main>
  )
}
