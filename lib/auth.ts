import { createHash, createHmac, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const COOKIE = "admin_session"
const DURACAO_MS = 1000 * 60 * 60 * 12

const segredo = () => process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || ""
const assinar = (v: string) => createHmac("sha256", segredo()).update(v).digest("hex")
const hash = (v: string) => createHash("sha256").update(v).digest()

export const adminConfigurado = () => Boolean(process.env.ADMIN_PASSWORD)

export function senhaCorreta(senha: string) {
  const esperada = process.env.ADMIN_PASSWORD
  if (!esperada) return false
  return timingSafeEqual(hash(senha), hash(esperada))
}

export async function criarSessao() {
  const exp = String(Date.now() + DURACAO_MS)
  const store = await cookies()
  store.set("admin_session", `${exp}.${assinar(exp)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: DURACAO_MS / 1000,
  })
}

export async function encerrarSessao() {
  const store = await cookies()
  store.delete(COOKIE)
}

export async function sessaoValida() {
  if (!adminConfigurado()) return false
  const valor = (await cookies()).get(COOKIE)?.value
  if (!valor) return false
  const [exp, sig] = valor.split(".")
  if (!exp || !sig || Number(exp) < Date.now()) return false
  const esperado = assinar(exp)
  return sig.length === esperado.length && timingSafeEqual(Buffer.from(sig), Buffer.from(esperado))
}

/** Use no início de toda página e ação do admin. */
export async function exigirAdmin() {
  if (!(await sessaoValida())) redirect("/admin/login")
}
