import React from "react";
import { cn } from "@/lib/utils";

interface CompactButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-[100px] h-[36px] text-sm",
  md: "w-[114px] h-[40px] text-sm", 
  lg: "w-[140px] h-[48px] text-base",
};

export function CompactButton({ 
  children, 
  className, 
  onClick, 
  disabled = false,
  type = "button",
  size = "md"
}: CompactButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-full border border-blue-600 flex justify-center items-center",
        "text-blue-600 font-bold font-['Merriweather'] tracking-tight",
        "hover:bg-blue-50 transition-colors duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </button>
  );
} 