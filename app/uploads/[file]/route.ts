import { promises as fs } from "node:fs"
import path from "node:path"
import { UPLOAD_DIR } from "@/lib/store"

const tipos: Record<string, string> = { ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".gif": "image/gif" }

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params
  const nome = path.basename(file)
  const tipo = tipos[path.extname(nome).toLowerCase()]
  if (!tipo || nome !== file) return new Response("Not found", { status: 404 })
  try {
    const bytes = await fs.readFile(path.join(UPLOAD_DIR, nome))
    return new Response(new Uint8Array(bytes), {
      headers: { "Content-Type": tipo, "Cache-Control": "public, max-age=31536000, immutable" },
    })
  } catch {
    return new Response("Not found", { status: 404 })
  }
}
