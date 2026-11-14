export function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items]
  return (
    <div className="flex h-10 items-center overflow-hidden border-b-2 border-ink bg-lemon">
      <div className="flex animate-marquee items-center gap-7 pl-7 font-pixel text-base font-semibold whitespace-nowrap">
        {loop.map((t, i) => (
          <span key={i} className="flex items-center gap-7" aria-hidden={i >= items.length || undefined}>
            <span>{t}</span>
            <span aria-hidden="true" className="inline-block size-2.5 bg-ink" />
          </span>
        ))}
      </div>
    </div>
  )
}
