import React from "react"

interface PopupProps {
    isVisible: boolean
    onClose: () => void
    children: React.ReactNode
    size?: "sm" | "md" | "lg" | "xl"
    showOverlay?: boolean
    className?: string
}

export function Popup({ 
    isVisible, 
    onClose, 
    children, 
    size = "md",
    showOverlay = true,
    className = ""
}: PopupProps) {
    if (!isVisible) return null

    const sizeClasses = {
        sm: "w-80 h-64",
        md: "w-120 h-80", 
        lg: "w-[500px] h-[450px]",
        xl: "w-[600px] h-[550px]"
    }

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return (
        <div className="fixed inset-0 flex items-start justify-center z-[9999] pt-32">
            {showOverlay && (
                <div 
                    className={`fixed inset-0 bg-gray-500 opacity-30`}
                    onClick={handleOverlayClick}
                ></div>
            )}
            <div className={`${sizeClasses[size]} bg-white px-8 py-5 rounded-2xl flex flex-col items-center justify-center gap-6 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.25)] border border-gray-100 relative z-[10000] ${className}`}>
                {children}
            </div>
        </div>
    )
}

// Popup Header Component
interface PopupHeaderProps {
    title: string
    subtitle?: string | string[]
    icon?: string
    iconAlt?: string
    className?: string
}

export function PopupHeader({ title, subtitle, icon, iconAlt, className = "" }: PopupHeaderProps) {
    const renderSubtitle = () => {
        if (!subtitle) return null;
        
        if (Array.isArray(subtitle)) {
            return subtitle.map((line, index) => (
                <div key={index} className="text-neutral-400 text-base font-normal font-['Lato'] leading-normal tracking-tight">
                    {line}
                </div>
            ));
        }
        
        return (
            <div className="text-neutral-400 text-base font-normal font-['Lato'] leading-normal tracking-tight">
                {subtitle}
            </div>
        );
    };

    return (
        <div className={`text-center ${className}`}>
            {icon && (
                <img src={icon} alt={iconAlt || "icon"} className="w-12 h-12 mx-auto mb-4" />
            )}
            <div className="text-stone-950 text-3xl font-normal font-merriweather tracking-tight mb-2">
                {title}
            </div>
            {renderSubtitle()}
        </div>
    )
}

// Popup Content Component
interface PopupContentProps {
    children: React.ReactNode
    className?: string
}

export function PopupContent({ children, className = "" }: PopupContentProps) {
    return (
        <div className={`w-full ${className}`}>
            {children}
        </div>
    )
}

// Popup Actions Component
interface PopupActionsProps {
    children: React.ReactNode
    className?: string
}

export function PopupActions({ children, className = "" }: PopupActionsProps) {
    return (
        <div className={`flex flex-row gap-3 w-full ${className}`}>
            {children}
        </div>
    )
}
