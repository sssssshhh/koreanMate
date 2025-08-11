import { useParams } from "react-router"
import { useState, useEffect } from "react"
import chaptersData from "@/features/learning/contents/chapters.json"
import sentenceMeaningData from "@/features/learning/contents/sample.json"
import { CustomProgress } from "@/common/ui/custom-progress"
import { CompactButton } from "@/common/ui/compact-button"

export default function SpeakingPractice() {
    const { storyId, chapterId } = useParams()
    
    // bring chapter data from chapters.json
    const chapter = chaptersData.chapters.find(ch => ch.id === chapterId)
    
    // bring sentence data from sample.json based on chapterId
    const [currentSentences, setCurrentSentences] = useState<any[]>([])
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
    const [progress, setProgress] = useState(0)
    const [isRecording, setIsRecording] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)

    useEffect(() => {
        if (chapterId) {
            // Find sentences for the current chapter
            const chapterSentences = sentenceMeaningData.chapterId === chapterId 
                ? sentenceMeaningData.sentences 
                : []
            
            setCurrentSentences(chapterSentences)
            
            // Calculate initial progress
            if (chapterSentences.length > 0) {
                setProgress(0)
            }
        }
    }, [chapterId])

    // Update progress when sentence index changes
    useEffect(() => {
        if (currentSentences.length > 0) {
            const progressPercentage = Math.round((currentSentenceIndex / currentSentences.length) * 100)
            setProgress(progressPercentage)
        }
    }, [currentSentenceIndex, currentSentences.length])

    const handleStartRecording = () => {
        setIsRecording(true)
        // TODO: Implement actual recording logic
        setTimeout(() => {
            setIsRecording(false)
            setShowResult(true)
            setIsCorrect(true) // For demo purposes
        }, 3000)
    }

    const handleNext = () => {
        if (currentSentenceIndex < currentSentences.length - 1) {
            setCurrentSentenceIndex(prev => prev + 1)
            setShowResult(false)
            setIsCorrect(false)
        } else {
            // All sentences completed
            console.log("All sentences completed!")
        }
    }

    if (!chapter) {
        return <div>Chapter not found</div>
    }

    if (currentSentences.length === 0) {
        return (
            <div className="w-full min-h-screen bg-[#FFFDD0] flex items-center justify-center p-6">
                <div className="w-[1284px] px-6 py-14 bg-white rounded-[32px] border-l border-r border-t border-amber-200 inline-flex flex-col justify-start items-center gap-8">
                    <h2 className="text-center text-stone-950 text-2xl font-normal font-['Merriweather'] tracking-tight">
                        No sentences found for this chapter
                    </h2>
                </div>
            </div>
        )
    }

    const currentSentence = currentSentences[currentSentenceIndex]

    return (
        <div className="w-full min-h-screen bg-[#FFFDD0] flex items-center justify-center p-6">
            <div className="w-[1284px] px-6 py-14 bg-white rounded-[32px] border-l border-r border-t border-amber-200 inline-flex flex-col justify-start items-center gap-8">
                {/* Progress Bar */}
                <CustomProgress 
                    progress={progress}
                    current={currentSentenceIndex + 1}
                    total={currentSentences.length}
                />
                
                <h2 className="text-center text-stone-950 text-2xl font-normal font-['Merriweather'] tracking-tight">
                    Practice speaking the sentences out loud
                    <br />
                    Listen carefully and repeat what you hear.
                </h2>
                
                {/* Current Sentence Display */}
                <div className="w-[742px] px-8 py-10 bg-neutral-100 rounded-3xl flex flex-col justify-between items-center gap-8">                    
                    {/* Sentence Display */}
                    <div className="w-full text-center">
                        <div className="text-2xl font-medium text-stone-950 mb-4">
                            {currentSentence.original}
                        </div>
                        <div className="text-lg text-neutral-600">
                            {currentSentence.meaning}
                        </div>
                    </div>
                    
                    {/* Recording Status */}
                    {isRecording && (
                        <div className="text-center">
                            <div className="text-blue-600 text-xl font-medium mb-2">
                                Recording...
                            </div>
                            <div className="w-6 h-6 bg-red-500 rounded-full animate-pulse mx-auto"></div>
                        </div>
                    )}
                    
                    {/* Result Display */}
                    {showResult && (
                        <div className="w-full text-center">
                            <div className={`text-3xl font-bold ${
                                isCorrect ? 'text-blue-600' : 'text-red-600'
                            }`}>
                                {isCorrect ? 'Great job!' : 'Try again'}
                            </div>
                            {isCorrect && (
                                <div className="mt-2">
                                    <img src="/images/OK.svg" alt="OK" className="w-8 h-8 mx-auto" />
                                </div>
                            )}
                        </div>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="w-full flex flex-row justify-center items-center gap-4">
                        {!showResult ? (
                            <>
                                <CompactButton size="sm" variant="skip">
                                    Skip
                                </CompactButton>
                                <CompactButton 
                                    size="sm" 
                                    variant="primary" 
                                    onClick={handleStartRecording}
                                    disabled={isRecording}
                                >
                                    {isRecording ? 'Recording...' : 'Start Recording'}
                                </CompactButton>
                            </>
                        ) : (
                            <CompactButton size="sm" variant="primary" onClick={handleNext}>
                                Next
                            </CompactButton>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
} 