"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { criarSessao, encerrarSessao, exigirAdmin, senhaCorreta } from "@/lib/auth"
import { categorias, type CategoriaId, type Produto } from "@/lib/produtos"
import { getProdutos, removeUpload, saveProdutos, saveUpload } from "@/lib/store"

export type Estado = { erro?: string } | undefined

const EXT: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" }
const MAX_BYTES = 5 * 1024 * 1024

const slugify = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")

const texto = (f: FormData, k: string) => String(f.get(k) ?? "").trim()

const revalidarTudo = () => revalidatePath("/", "layout")

export async function entrar(_: Estado, form: FormData): Promise<Estado> {
  if (!senhaCorreta(texto(form, "senha"))) return { erro: "Senha incorreta." }
  await criarSessao()
  redirect("/admin")
}

export async function sair() {
  await encerrarSessao()
  redirect("/admin/login")
}

export async function salvarProduto(_: Estado, form: FormData): Promise<Estado> {
  await exigirAdmin()

  const slugOriginal = texto(form, "slugOriginal")
  const nome = texto(form, "nome")
  const cat = texto(form, "cat") as CategoriaId
  const categoria = categorias.find((c) => c.id === cat)
  const preco = Number(texto(form, "preco").replace(",", "."))
  const sub = texto(form, "sub")

  if (!nome) return { erro: "Informe o nome do produto." }
  if (!categoria) return { erro: "Escolha uma categoria." }
  if (!Number.isFinite(preco) || preco < 0) return { erro: "Preço inválido." }

  const novas = form.getAll("novas").filter((f): f is File => f instanceof File && f.size > 0)
  for (const f of novas) {
    if (!EXT[f.type]) return { erro: `"${f.name}" não é uma imagem JPG, PNG, WEBP ou GIF.` }
    if (f.size > MAX_BYTES) return { erro: `"${f.name}" passa de 5 MB.` }
  }

  const lista = await getProdutos()
  const atual = slugOriginal ? lista.find((p) => p.slug === slugOriginal) : undefined
  if (slugOriginal && !atual) return { erro: "Produto não encontrado." }

  let slug = slugOriginal
  if (!slug) {
    const base = slugify(nome) || "produto"
    slug = base
    for (let i = 2; lista.some((p) => p.slug === slug); i++) slug = `${base}-${i}`
  }

  const manter = new Set(form.getAll("manter").map(String))
  const fotosAntigas = atual?.fotos ?? []
  const fotos = fotosAntigas.filter((f) => manter.has(f.src))
  for (const f of fotosAntigas) if (!manter.has(f.src)) await removeUpload(f.src)

  for (const f of novas) {
    const arquivo = await saveUpload(EXT[f.type], Buffer.from(await f.arrayBuffer()))
    fotos.push({ src: `/uploads/${arquivo}`, alt: `${categoria.label.replace(/s$/, "")} ${nome}`, nome: f.name })
  }

  const apelido = texto(form, "apelido")
  const descricao = texto(form, "descricao")
  const produto: Produto = {
    slug,
    file: fotos[0]?.nome ?? `${slug}.jpg`,
    nome,
    cat,
    tag: categoria.tag,
    sub: sub || `${categoria.label.replace(/s$/, "")} · PLA`,
    preco,
    fotos,
    ...(apelido && { apelido }),
    ...(descricao && { descricao }),
  }

  await saveProdutos(atual ? lista.map((p) => (p.slug === slug ? produto : p)) : [...lista, produto])
  revalidarTudo()
  redirect("/admin")
}

export async function excluirProduto(slug: string) {
  await exigirAdmin()
  const lista = await getProdutos()
  const alvo = lista.find((p) => p.slug === slug)
  if (!alvo) return
  for (const f of alvo.fotos) await removeUpload(f.src)
  await saveProdutos(lista.filter((p) => p.slug !== slug))
  revalidarTudo()
}

export async function moverProduto(slug: string, direcao: -1 | 1) {
  await exigirAdmin()
  const lista = await getProdutos()
  const i = lista.findIndex((p) => p.slug === slug)
  const j = i + direcao
  if (i < 0 || j < 0 || j >= lista.length) return
  ;[lista[i], lista[j]] = [lista[j], lista[i]]
  await saveProdutos(lista)
  revalidarTudo()
}
