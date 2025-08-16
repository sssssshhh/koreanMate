import { Link } from "react-router"
import { LargeButton } from "@/common/ui/large-button"

interface StoryLayoutProps {
    children: React.ReactNode;
    storyTitle: string;
    thumbnail: string;
    level: string;
    description: string;
    showSaveButton?: boolean;
    breadcrumbItems?: Array<{
        text: string;
        link?: string;
        isCurrent?: boolean;
    }>;
}

export function StoryLayout({ 
    children, 
    storyTitle, 
    thumbnail, 
    level, 
    description, 
    showSaveButton = true,
    breadcrumbItems = []
}: StoryLayoutProps) {
    return (
        <div className="w-full flex flex-col items-center justify-center px-4 lg:px-28 py-20">
            {/* Breadcrumb Navigation */}
            {breadcrumbItems.length > 0 && (
                <div className="w-full flex text-base font-bold font-pretendard px-4 lg:px-0 justify-center lg:justify-start">
                    {breadcrumbItems.map((item, index) => (
                        <div key={index} className="flex items-center">
                            {item.link ? (
                                <Link to={item.link} className="text-blue-600 hover:text-blue-700">
                                    {item.text}
                                </Link>
                            ) : (
                                <span className={item.isCurrent ? "text-stone-950" : "text-blue-600"}>
                                    {item.text}
                                </span>
                            )}
                            {index < breadcrumbItems.length - 1 && (
                                <span className="mx-2 text-blue-600">:</span>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Story Information Section */}
            <div className="pt-16 w-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
                <img src={thumbnail} alt={storyTitle} className="w-full lg:w-lg h-auto lg:h-96 rounded-lg max-w-md lg:max-w-none" />
                <div className="w-full text-left">
                    <div className="text-stone-950 text-2xl lg:text-4xl font-bold font-merriweather tracking-tight">
                        {storyTitle}
                    </div>
                    <div className="pt-4 text-orange-600 text-lg lg:text-xl font-normal font-pretendard">
                        {level}
                    </div>
                    <div className="pt-4 text-neutral-400 text-base lg:text-lg font-normal font-lato leading-relaxed">
                        {description}
                    </div>
                    {showSaveButton && (
                        <div className="pt-8 flex justify-center">
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
                                <span>Save lessons</span>
                                <img src="/images/star.svg" alt="star" className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Content Area */}
            <div className="w-full">
                {children}
            </div>
        </div>
    )
} 