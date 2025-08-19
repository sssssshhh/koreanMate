import { useNavigate } from "react-router"
import { SmallButton } from "@/common/ui/small-button"
import { Popup, PopupHeader, PopupContent, PopupActions } from "@/common/ui/popup"

interface CompletionPopupProps {
    isVisible: boolean
    onClose: () => void
    storyId?: string
    chapterId?: string
}

export function CompletionPopup({ isVisible, onClose, storyId, chapterId }: CompletionPopupProps) {
    const navigate = useNavigate()

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
        <Popup 
            isVisible={isVisible} 
            onClose={onClose}
            size="lg"
        >
            <PopupHeader
                title="Well done!"
                subtitle={[
                    "You arranged all the sentences — that's amazing!",
                    "Want to try saying the sentences out loud?"
                ]}
                icon="/images/welldone.svg"
                iconAlt="welldone"
            />
            
            <PopupContent>
                <div className="p-5 bg-red-50 rounded-2xl flex flex-col items-start">
                    <div className="w-full text-center text-orange-600 text-sm font-['Lato']">
                        Want to try saying the sentences out loud?
                        <br />
                        Let's practice speaking together — 
                        <br />
                        youre doing great!
                    </div>
                </div>
            </PopupContent>

            <PopupActions>
                <SmallButton 
                    size="lg" 
                    variant="skip" 
                    onClick={handleSpeakingPractice}
                >
                    Speaking Practice
                </SmallButton>
                <SmallButton 
                    size="lg" 
                    variant="primary" 
                    onClick={handleReadAgain}
                >
                    Read Again
                </SmallButton>
            </PopupActions>
        </Popup>
    )
} 