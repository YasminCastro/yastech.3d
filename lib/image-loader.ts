// Redimensiona as fotos pelo CDN do Sanity em vez de usar a otimização de imagens da Vercel
// (que tem cota limitada no plano gratuito). Imagens locais de /public já são leves e vão como estão.
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (!src.startsWith("https://cdn.sanity.io/")) return `${src}?w=${width}`
  const url = new URL(src)
  url.searchParams.set("w", String(width))
  if (url.searchParams.has("h")) url.searchParams.set("h", String(width))
  if (quality) url.searchParams.set("q", String(quality))
  return url.toString()
}
