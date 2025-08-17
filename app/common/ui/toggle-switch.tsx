import React from "react";

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  label?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ToggleSwitch({
  isOn,
  onToggle,
  label,
  disabled = false,
  size = "md",
  className = ""
}: ToggleSwitchProps) {
  const sizeClasses = {
    sm: "h-5 w-9",
    md: "h-6 w-11",
    lg: "h-7 w-14"
  };

  const knobSizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  const knobTransformClasses = {
    sm: isOn ? "translate-x-5" : "translate-x-1",
    md: isOn ? "translate-x-6" : "translate-x-1",
    lg: isOn ? "translate-x-8" : "translate-x-1"
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        onClick={onToggle}
        disabled={disabled}
        className={`relative inline-flex ${sizeClasses[size]} items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer"
        } ${
          isOn 
            ? "bg-blue-600 hover:bg-blue-700" 
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        <span
          className={`inline-block ${knobSizeClasses[size]} transform rounded-full bg-white transition-transform duration-200 ease-in-out ${knobTransformClasses[size]}`}
        />
      </button>
      {label && (
        <label className={`text-sm font-medium ${
          disabled ? "text-gray-400" : "text-gray-700"
        }`}>
          {label}
        </label>
      )}
    </div>
  );
}
