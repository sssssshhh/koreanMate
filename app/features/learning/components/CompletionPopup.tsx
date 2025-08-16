import { useNavigate } from "react-router"
import { CompactButton } from "@/common/ui/compact-button"

interface CompletionPopupProps {
    isVisible: boolean
    onClose: () => void
    storyId?: string
    chapterId?: string
}

export function CompletionPopup({ isVisible, onClose, storyId, chapterId }: CompletionPopupProps) {
    const navigate = useNavigate()

    if (!isVisible) return null

    const handleReadAgain = () => {
        if (storyId && chapterId) {
            navigate(`/stories/${storyId}/chapters/${chapterId}`)
        }
        onClose()
    }

    const handleSpeakingPractice = () => {
        if (storyId && chapterId) {
            navigate(`/stories/${storyId}/chapters/${chapterId}/speaking-practice`)
        }
        onClose()
    }

    return (
        <div className="absolute inset-0 flex items-start justify-center z-50 pt-32">
            <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
            <div className="w-[406px] h-[421px] bg-white px-8 py-5 rounded-2xl flex flex-col items-center justify-center gap-6 shadow-2xl border border-gray-200 relative z-10">
            <img src="/images/welldone.svg" alt="welldone" className="w-12 h-12" />
                <div className="text-center">
                    <div className="text-stone-950 text-3xl font-pretendardormal font-merriweather tracking-tight">
                        Well done!
                    </div>
                    <div className="pb-5 w-80 text-neutral-400 text-base font-pretendardormal font-['Lato'] leading-normal tracking-tight">
                    You arranged all the sentences — 
                    <br />
                    that's amazing!
                    </div>
                    <div className="p-5 bg-red-50 rounded-2xl flex flex-col items-start" >
                        <div className="w-full text-center text-orange-600 text-sm font-['Lato']">
                            Want to try saying the sentences out loud?
                            <br />
                            Let's practice speaking together — 
                            <br />
                            youre doing great!
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-3 w-full">
                    <CompactButton 
                        size="lg" 
                        variant="skip" 
                        onClick={handleSpeakingPractice}
                        className="w-full bg-white text-blue-600 border-blue-600 hover:bg-gray-50"
                    >
                        Speaking Practice
                    </CompactButton>
                    <CompactButton 
                        size="lg" 
                        variant="primary" 
                        onClick={handleReadAgain}
                        className="w-full bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                    >
                        Read Again
                    </CompactButton>
                </div>
            </div>
        </div>
    )
} 