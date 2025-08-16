import { type ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface LargeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "blue" | "secondary" | "success" | "orange"
  customColor?: string
}

const LargeButton = forwardRef<HTMLButtonElement, LargeButtonProps>(
  ({ className, variant = "default", customColor, children, ...props }, ref) => {
    const baseClasses = "w-[175px] h-[42px] px-5 py-2.5 rounded-full font-['Pretendard'] font-medium transition-all duration-200 flex items-center justify-center gap-2"
    
    const variantClasses = {
      default: "bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300",
      blue: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
      secondary: "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800",
      success: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800",
      orange: "bg-orange-600 text-white hover:bg-orange-700 active:bg-orange-800",
    }

    const customStyle = customColor ? { backgroundColor: customColor } : {}

    return (
      <button
        className={cn(baseClasses, variantClasses[variant], className)}
        style={customStyle}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

LargeButton.displayName = "LargeButton"

export { LargeButton } 