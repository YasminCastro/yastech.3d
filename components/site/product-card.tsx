import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { FolderIcon } from "@/components/site/icons"
import { formatarPreco, type Produto } from "@/lib/produtos"

export function ProductCard({ produto, eager }: { produto: Produto; eager?: boolean }) {
  const foto = produto.fotos[0]
  return (
    <Link
      href={`/catalogo/${produto.slug}`}
      className="group flex flex-col border-2 border-ink bg-white text-ink no-underline transition-all drop-md hover:-translate-x-[3px] hover:-translate-y-[3px] hover:text-ink hover:[--drop:8px_8px_0_var(--color-ink)]"
    >
      <div className="flex h-[30px] items-center justify-between border-b-2 border-ink bg-titlebar-card pr-2 pl-2.5">
        <span className="font-pixel text-sm text-white">{produto.file}</span>
        <span aria-hidden="true" className="h-3.5 w-4 border-[1.5px] border-ink bg-lilac text-center font-pixel text-[10px] leading-3 font-bold">×</span>
      </div>
      <div className="relative aspect-[4/5] overflow-hidden bg-white">
        {foto ? (
          <Image src={foto.src} alt={foto.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" loading={eager ? "eager" : "lazy"} className="object-cover" />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-2.5 bg-placeholder-lilac">
            <FolderIcon className="h-[46px] w-14" />
            <span className="border-2 border-ink bg-white px-2 py-0.5 font-pixel text-[15px]">FOTO EM BREVE</span>
          </div>
        )}
        <Badge className="absolute top-2.5 left-2.5">{produto.tag}</Badge>
      </div>
      <div className="flex flex-col gap-1 border-t-2 border-ink px-4 pt-3.5 pb-[18px]">
        <span className="font-pixel text-[21px] leading-[1.1] font-semibold uppercase">{produto.nome}</span>
        <span className="text-sm text-ink-muted">{produto.sub}</span>
        <span className="mt-1 text-xl font-extrabold">{formatarPreco(produto.preco)}</span>
      </div>
    </Link>
  )
}
