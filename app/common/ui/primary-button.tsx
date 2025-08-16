import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const primaryButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive font-merriweather cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function PrimaryButton({
  className,
  variant,
  size,
  asChild = false,
  bgColor,
  textColor,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof primaryButtonVariants> & {
    asChild?: boolean
    bgColor?: string
    textColor?: string
  }) {
  const Comp = asChild ? Slot : "button"

  const buttonStyle = {
    ...(bgColor && { backgroundColor: bgColor }),
    ...(textColor && { color: textColor })
  } as React.CSSProperties

  return (
    <Comp
      data-slot="primary-button"
      className={cn(
        primaryButtonVariants({ variant, size, className }),
        bgColor && "hover:opacity-90",
        bgColor === "#FFFFFF" && "border border-gray-300"
      )}
      style={Object.keys(buttonStyle).length > 0 ? buttonStyle : undefined}
      {...props}
    />
  )
}

export { PrimaryButton, primaryButtonVariants }
