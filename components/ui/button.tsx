import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 border-2 border-ink font-pixel whitespace-nowrap no-underline transition-all outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[18px]",
  {
    variants: {
      variant: {
        // roxo (ação principal)
        default:
          "bg-primary text-primary-foreground bevel-violet hover:text-primary-foreground hover:brightness-110 active:bevel-violet-pressed",
        // amarelo
        secondary:
          "bg-secondary text-secondary-foreground bevel-lemon hover:text-secondary-foreground hover:brightness-95",
        // cinza lilás (navegação)
        outline:
          "bg-lilac text-ink bevel-raised hover:text-ink hover:bg-lilac-pressed aria-[current=page]:bg-lilac-pressed aria-[current=page]:bevel-pressed",
        ghost: "border-transparent bg-transparent text-ink hover:bg-lilac",
        destructive: "bg-destructive text-white",
        link: "border-transparent text-violet underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-11 px-[18px] text-[17px]",
        sm: "min-h-11 px-4 text-base",
        lg: "min-h-12 px-6 text-lg",
        xl: "min-h-[52px] px-[26px] text-xl",
        "2xl": "min-h-[60px] px-7 text-[22px]",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
