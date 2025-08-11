import React from "react";
import { cn } from "@/lib/utils";

interface CompactButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
  variant?: "default" | "filter" | "primary" | "skip";
  customColor?: {
    bgColor?: string;
    textColor?: string;
    borderColor?: string;
  };
}

const sizeClasses = {
  sm: "h-[36px] px-4 text-sm",
  md: "h-[40px] px-6 text-sm", 
  lg: "h-[48px] px-8 text-base",
};

const variantClasses = {
  default: "border-blue-600 text-blue-600 hover:bg-blue-50",
  filter: "border-yellow-600 text-yellow-600 hover:text-white hover:bg-yellow-600",
  primary: "border-orange-600 text-orange-600 hover:bg-orange-50",
  skip: "border-gray-600 text-gray-600 hover:bg-gray-50",
};

export function CompactButton({ 
  children, 
  className, 
  onClick, 
  disabled = false,
  type = "button",
  size = "md",
  variant = "default",
  customColor
}: CompactButtonProps) {
  const buttonStyle = customColor ? {
    backgroundColor: customColor.bgColor,
    color: customColor.textColor,
    borderColor: customColor.borderColor,
  } : {};

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-full border flex justify-center items-center",
        "font-['Merriweather'] tracking-tight",
        "transition-colors duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "min-w-fit whitespace-nowrap",
        "cursor-pointer",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      style={buttonStyle}
    >
      {children}
    </button>
  );
} 