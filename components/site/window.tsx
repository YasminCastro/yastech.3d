import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"

type Controls = "min-close" | "all" | "none"

const glyph: Record<string, string> = { min: "_", max: "□", close: "×" }

/** Janela estilo Windows 98: barra de título em degradê + corpo com chanfro. */
export function Window({
  title,
  controls = "all",
  className,
  bodyClassName,
  barClassName,
  children,
  ...rest
}: {
  title: ReactNode
  controls?: Controls
  className?: string
  bodyClassName?: string
  barClassName?: string
  children: ReactNode
} & Omit<ComponentProps<"section">, "title" | "children" | "className">) {
  const keys = controls === "all" ? ["min", "max", "close"] : controls === "min-close" ? ["min", "close"] : []
  return (
    <section className={cn("border-2 border-ink bg-lilac-panel bevel-raised", className)} {...rest}>
      <div className={cn("flex h-[38px] items-center justify-between border-b-2 border-ink bg-titlebar pr-1.5 pl-3.5", barClassName)}>
        <span className="font-pixel text-base text-white">{title}</span>
        {keys.length > 0 && (
          <div aria-hidden="true" className="flex gap-1">
            {keys.map((k) => (
              <span key={k} className="flex h-[22px] w-6 items-center justify-center border-2 border-ink bg-lilac font-pixel text-[13px] leading-none font-bold">
                {glyph[k]}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className={bodyClassName}>{children}</div>
    </section>
  )
}
