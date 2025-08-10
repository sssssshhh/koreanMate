interface NavigationButtonsProps {
    category: string;
    onPageChange: (category: string, direction: 'next' | 'prev') => void;
    isNavigationDisabled: (category: string, direction: 'next' | 'prev') => boolean;
}

export function NavigationButtons({ 
    category, 
    onPageChange, 
    isNavigationDisabled 
}: NavigationButtonsProps) {
    return (
        <div className="flex items-center gap-2">
            <button 
                onClick={() => onPageChange(category, 'prev')}
                disabled={isNavigationDisabled(category, 'prev')}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isNavigationDisabled(category, 'prev')
                        ? 'border-gray-200 text-gray-300'
                        : 'border-gray-300 text-gray-600 hover:text-gray-800 hover:border-gray-400 cursor-pointer'
                }`}
            >
                &lt;
            </button>
            <button 
                onClick={() => onPageChange(category, 'next')}
                disabled={isNavigationDisabled(category, 'next')}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isNavigationDisabled(category, 'next')
                        ? 'border-gray-200 text-gray-300'
                        : 'border-gray-300 text-gray-600 hover:text-gray-800 hover:border-gray-400 cursor-pointer'
                }`}
            >
                &gt;
            </button>
        </div>
    );
} 