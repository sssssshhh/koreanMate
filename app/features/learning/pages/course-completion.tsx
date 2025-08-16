import { useParams, useNavigate } from "react-router"
import { CompactButton } from "@/common/ui/compact-button"

export default function CourseCompletion() {
    const { storyId, chapterId } = useParams()
    const navigate = useNavigate()

    const handleContinueLearning = () => {
        if (storyId && chapterId) {
            navigate(`/stories/${storyId}/chapters`)
        }
    }

    const handleBackToStories = () => {
        navigate("/stories")
    }

    return (
        <div className="w-full min-h-screen bg-[#FFFDD0] flex items-center justify-center p-6">
            <div className="w-[1284px] px-6 py-14 bg-white rounded-[32px] border-l border-r border-t border-amber-200 inline-flex flex-col justify-start items-center gap-8">
                {/* Completion Icon */}
                <img src="/images/gift-chapter.gif" alt="gift" className="w-48 h-36" />
                
                {/* Completion Message */}
                <div className="text-center">
                    <div className="text-center justify-start text-stone-950 text-4xl font-pretendardormal font-merriweather tracking-tight">
                        Chpater Complete!
                    </div>
                    <div className="pt-3 pb-5 w-[560px] text-center text-neutral-400 text-base font-pretendardormal font-['Lato'] leading-normal tracking-tight">
                        You're doing amazing! 
                        <br />
                        Keep going to light up the world with your Korean learning journey!
                    </div>
    
                    <div className="w-96 pt-3 pb-5 bg-white rounded-[20px] outline outline-1 outline-offset-[-1px] outline-amber-200 inline-flex flex-col justify-start items-center gap-2.5">
                        <img src="/images/welldone.svg" alt="welldone" className="w-12 h-12" />
                        <div className="text-stone-950 text-base font-pretendardormal font-['Lato'] leading-normal tracking-tight">
                            Total Stars: 0/0
                        </div>
                        <div className="text-center justify-start text-neutral-400 text-sm font-pretendardormal font-merriweather tracking-tight">
                            +5 points earned!
                        </div>
                    </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-row gap-6">
                    <CompactButton 
                        size="sm" 
                        variant="skip"
                        onClick={handleContinueLearning}
                    >
                        Continue Learning
                    </CompactButton>
                    <CompactButton 
                        size="sm" 
                        variant="primary"
                        onClick={handleBackToStories}
                    >
                        Story List
                    </CompactButton>
                    <CompactButton 
                        size="sm" 
                        variant="default"
                    >
                        My Stars
                    </CompactButton>
                </div>
            </div>
        </div>
    )
} 