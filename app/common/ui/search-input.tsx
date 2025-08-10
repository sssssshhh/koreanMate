import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "./icon";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  iconPosition?: "left" | "right";
  iconClassName?: string;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, icon, iconPosition = "left", iconClassName, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && iconPosition === "left" && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <Icon name={icon} className={cn("text-gray-400", iconClassName)} />
          </div>
        )}
        <input
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-12 w-full min-w-0 rounded-md border px-4 py-3 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "text-gray-600 placeholder:text-gray-400",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            icon && iconPosition === "left" && "pl-10",
            icon && iconPosition === "right" && "pr-10",
            "min-w-[400px]",
            "bg-white",
            className
          )}
          style={{ backgroundColor: 'white' }}
          ref={ref}
          {...props}
        />
        {icon && iconPosition === "right" && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <Icon name={icon} className={cn("text-gray-400", iconClassName)} />
          </div>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export { SearchInput }; 