import React from "react";
import { cn } from "@/lib/utils";

interface IconProps {
  name: string;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  type?: "solid" | "regular" | "light" | "brands";
}

const sizeClasses = {
  xs: "text-xs",        // 12px
  sm: "text-sm",        // 14px
  md: "text-base",      // 16px
  lg: "text-lg",        // 18px
  xl: "text-xl",        // 20px
  "2xl": "text-2xl",    // 24px
};

const typeClasses = {
  solid: "fas",         // Font Awesome Solid
  regular: "far",       // Font Awesome Regular
  light: "fal",         // Font Awesome Light (Pro only)
  brands: "fab",        // Font Awesome Brands
};

export function Icon({ 
  name, 
  className, 
  size = "md", 
  type = "solid" 
}: IconProps) {
  return (
    <i
      className={cn(
        typeClasses[type],
        `fa-${name}`,
        sizeClasses[size],
        className,
        "cursor-pointer"
      )}
    />
  );
}
