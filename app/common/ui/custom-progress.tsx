interface CustomProgressProps {
    progress: number
    current: number
    total: number
}

export function CustomProgress({ progress, current, total }: CustomProgressProps) {
    return (
        <div className="w-full max-w-md">
            <div className="relative">
                {/* Background Progress Bar */}
                <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div 
                        className="h-2 bg-sky-400 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                
                {/* Current Position Indicator */}
                <div 
                    className="absolute top-0 w-4 h-4 bg-[#0057FF] rounded-full shadow-md transform -translate-y-1 transition-all duration-300"
                    style={{ left: `calc(${progress}% - 8px)` }}
                />
            </div>
        </div>
    )
} 