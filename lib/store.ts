import { promises as fs } from "node:fs"
import path from "node:path"
import type { Produto } from "@/lib/produtos"

const DATA_DIR = path.join(process.cwd(), "data")
const FILE = path.join(DATA_DIR, "produtos.json")
export const UPLOAD_DIR = path.join(DATA_DIR, "uploads")

export async function getProdutos(): Promise<Produto[]> {
  return JSON.parse(await fs.readFile(FILE, "utf8")) as Produto[]
}

export async function getProduto(slug: string) {
  return (await getProdutos()).find((p) => p.slug === slug)
}

export async function saveProdutos(lista: Produto[]) {
  const tmp = FILE + ".tmp"
  await fs.writeFile(tmp, JSON.stringify(lista, null, 2) + "\n")
  await fs.rename(tmp, FILE)
}

export async function saveUpload(ext: string, bytes: Buffer) {
  await fs.mkdir(UPLOAD_DIR, { recursive: true })
  const name = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  await fs.writeFile(path.join(UPLOAD_DIR, name), bytes)
  return name
}

export async function removeUpload(src: string) {
  if (!src.startsWith("/uploads/")) return
  await fs.rm(path.join(UPLOAD_DIR, path.basename(src)), { force: true })
}
