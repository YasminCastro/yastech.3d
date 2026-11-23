import type { Metadata } from "next"
import { Window } from "@/components/site/window"
import { exigirAdmin } from "@/lib/auth"
import { ProductForm } from "../product-form"

export const metadata: Metadata = { title: "Novo produto", robots: { index: false } }

export default async function NovoPage() {
  await exigirAdmin()
  return (
    <main className="bg-checker flex-1">
      <div className="mx-auto w-full max-w-[720px] px-[clamp(16px,4vw,56px)] py-10 pb-24">
        <Window title="novo_produto.exe" controls="min-close" className="drop-md" bodyClassName="p-5">
          <ProductForm />
        </Window>
      </div>
    </main>
  )
}
