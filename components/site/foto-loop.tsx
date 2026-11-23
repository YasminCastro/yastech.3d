"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

/**
 * Alterna, em loop e com fade, entre fotos (capas de categoria e círculos do hero).
 * `atraso` desencontra os cards para não trocarem todos ao mesmo tempo.
 * Com "reduzir movimento" ativado no sistema, fica parada na primeira foto.
 */
export function FotoLoop({
  fotos,
  sizes,
  intervalo = 5000,
  atraso = 0,
  eager = false,
}: {
  fotos: string[]
  sizes: string
  intervalo?: number
  atraso?: number
  /** Carrega a primeira foto na hora (use quando estiver no topo da página). */
  eager?: boolean
}) {
  const [atual, setAtual] = useState(0)

  useEffect(() => {
    if (fotos.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let timer: ReturnType<typeof setInterval> | undefined
    const inicio = setTimeout(() => {
      setAtual((i) => (i + 1) % fotos.length)
      timer = setInterval(() => setAtual((i) => (i + 1) % fotos.length), intervalo)
    }, intervalo + atraso)
    return () => {
      clearTimeout(inicio)
      clearInterval(timer)
    }
  }, [fotos.length, intervalo, atraso])

  return fotos.map((src, i) => (
    <Image
      key={src}
      src={src}
      alt=""
      fill
      sizes={sizes}
      loading={eager && i === 0 ? "eager" : "lazy"}
      className={`object-cover transition-opacity duration-1000 ${i === atual ? "opacity-100" : "opacity-0"}`}
    />
  ))
}
