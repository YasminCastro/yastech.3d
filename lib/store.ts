import { createImageUrlBuilder } from "@sanity/image-url"
import { createClient, defineQuery } from "next-sanity"
import { apiVersion, dataset, projectId } from "@/sanity/env"
import { categorias, type CategoriaId, type Cor, type Produto } from "@/lib/produtos"

const client = createClient({ projectId, dataset, apiVersion, useCdn: true })
const imagens = createImageUrlBuilder({ projectId, dataset })

/** Novos produtos e edições aparecem no site em até 1 minuto. */
const REVALIDAR = 60

const CORES = defineQuery(`*[_type == "cor"] | order(material desc, ordem asc, nome asc){ nome, hex, hex2, material }`)

const PRODUTOS = defineQuery(`*[_type == "produto" && defined(slug.current)] | order(_createdAt asc){
  "slug": slug.current, nome, categoria, preco, descricao, subtitulo, apelido,
  fotos[]{ asset, crop, hotspot, alt },
  "cores": cores[]->{ nome, hex, hex2, material }
}`)

type FotoSanity = { asset?: { _ref: string }; crop?: unknown; hotspot?: unknown; alt?: string }
type ProdutoSanity = {
  slug: string
  nome: string
  categoria: CategoriaId
  preco: number
  descricao?: string
  subtitulo?: string
  apelido?: string
  fotos?: FotoSanity[] | null
  cores?: (Cor | null)[] | null
}

const buscar = <T,>(query: string) => client.fetch<T>(query, {}, { next: { revalidate: REVALIDAR } })

export async function getCores(): Promise<Cor[]> {
  if (!projectId) return []
  return buscar<Cor[]>(CORES)
}

export async function getProdutos(): Promise<Produto[]> {
  if (!projectId) return []
  const [lista, todasCores] = await Promise.all([buscar<ProdutoSanity[]>(PRODUTOS), getCores()])
  return lista.map((p) => {
    const categoria = categorias.find((c) => c.id === p.categoria) ?? categorias[categorias.length - 1]
    const singular = categoria.label.replace(/s$/, "")
    const cores = (p.cores ?? []).filter((c): c is Cor => Boolean(c))
    return {
      slug: p.slug,
      file: `${p.slug}.jpg`,
      nome: p.nome,
      cat: categoria.id,
      tag: categoria.tag,
      sub: p.subtitulo || singular,
      preco: p.preco ?? 0,
      descricao: p.descricao || undefined,
      apelido: p.apelido || undefined,
      cores: cores.length > 0 ? cores : todasCores,
      fotos: (p.fotos ?? [])
        .filter((f) => f.asset)
        .map((f, i) => ({
          src: imagens.image(f).width(1200).height(1200).fit("crop").auto("format").quality(80).url(),
          alt: f.alt || `${singular} ${p.nome}`,
          nome: `${p.slug}${i ? `-${i + 1}` : ""}.jpg`,
        })),
    }
  })
}

export async function getProduto(slug: string) {
  return (await getProdutos()).find((p) => p.slug === slug)
}
