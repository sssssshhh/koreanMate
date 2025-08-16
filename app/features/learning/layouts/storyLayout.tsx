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
        <div className="w-full flex flex-col items-center justify-center px-28 py-20">
            {/* Breadcrumb Navigation */}
            {breadcrumbItems.length > 0 && (
                <div className="w-full flex text-base font-bold font-['Pretendard'] tracking-tight">
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
            <div className="pt-16 w-full flex flex-row gap-12">
                <img src={thumbnail} alt={storyTitle} className="w-lg h-96 rounded-lg" />
                <div className="w-full">
                    <div className="justify-start text-orange-600 text-lg font-medium font-['Pretendard'] leading-relaxed tracking-tight">
                        {level} Level
                    </div>
                    <div className="pt-6 text-stone-950 text-4xl font-bold font-merriweather leading-[56px] tracking-tight">
                        {storyTitle}
                    </div>
                    <div className="py-7 text-neutral-400 text-lg font-medium font-['Pretendard'] leading-relaxed tracking-tight max-w-2xl whitespace-pre-line">
                        {description}
                    </div>
                    {showSaveButton && (
                        <LargeButton variant="blue">
                            <span className="text-white text-base font-bold font-merriweather tracking-tight">Save lessons</span>
                            <img src="/images/star.svg" alt="star" className="w-6 h-6" />
                        </LargeButton>
                    )}
                </div>
            </div>
            
            {/* Page Content */}
            {children}
        </div>
    )
} 