import { useParams, useNavigate } from "react-router"
import { useState, useEffect } from "react"
import chaptersData from "@/features/learning/contents/chapters.json"
import sentenceMeaningData from "@/features/learning/contents/sample.json"
import { CustomProgress } from "@/common/ui/custom-progress"
import { CompactButton } from "@/common/ui/compact-button"

export default function SpeakingPractice() {
    const { storyId, chapterId } = useParams()
    const navigate = useNavigate()
    
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
            // All sentences completed - Navigate to completion page
            if (storyId && chapterId) {
                navigate(`/stories/${storyId}/chapters/${chapterId}/completion`)
            }
        }
    }

    if (!chapter) {
        return <div>Chapter not found</div>
    }

    if (currentSentences.length === 0) {
        return (
            <div className="w-full min-h-screen bg-[#FFFDD0] flex items-center justify-center p-6">
                <div className="w-[1284px] px-6 py-14 bg-white rounded-[32px] border-l border-r border-t border-amber-200 inline-flex flex-col justify-start items-center gap-8">
                    <div className="py-8 text-center text-stone-950 text-2xl font-pretendardormal font-merriweather tracking-tight">
                    This sentence is from the story you just read. 
                    <br />
                    Try reading it out loud in Korean.
                    </div>
                </div>
            </div>
        )
    }

    const currentSentence = currentSentences[currentSentenceIndex]
    
    // Add safety check for currentSentence
    if (!currentSentence) {
        return (
            <div className="w-full min-h-screen bg-[#FFFDD0] flex items-center justify-center p-6">
                <div className="w-[1284px] px-6 py-14 bg-white rounded-[32px] border-l border-r border-t border-amber-200 inline-flex flex-col justify-start items-center gap-8">
                    <div className="py-8 text-center text-stone-950 text-2xl font-pretendardormal font-merriweather tracking-tight">
                        Loading sentence...
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full min-h-screen bg-[#FFFDD0] flex items-center justify-center p-6">
            <div className="w-[1284px] px-6 py-14 bg-white rounded-[32px] border-l border-r border-t border-amber-200 inline-flex flex-col justify-start items-center gap-8">
                {/* Progress Bar */}
                <CustomProgress 
                    progress={progress}
                    current={currentSentenceIndex + 1}
                    total={currentSentences.length}
                />
                
                <h2 className="text-center text-stone-950 text-2xl font-pretendardormal font-merriweather tracking-tight">
                    {!showResult && (
                        <>
                            Practice speaking the sentences out loud
                            <br />
                            Listen carefully and repeat what you hear.
                        </>
                    )}
                </h2>
                
                {/* Current Sentence Display */}
                <div className="w-[742px] px-8 py-10 bg-neutral-100 rounded-3xl flex flex-col justify-between items-center gap-8">                    
                    {/* Speaker Icon - Only show when not showing result */}
                    {!showResult && (
                        <div className="relative group">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer">
                                <img src="/images/speaker.svg" alt="speaker" className="w-8 h-8" />
                            </div>
                            
                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-white text-black text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 border border-gray-200 shadow-lg">
                                Start by pressing the play button.
                                {/* Arrow */}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
                            </div>
                        </div>
                    )}
                    
                    {/* Sentence Display - Only show when not showing result */}
                    {!showResult && (
                        <div className="w-full text-center">
                            <div className="text-blue-600 text-lg font-bold font-merriweather leading-relaxed tracking-tight">
                                Now say it yourself.
                            </div>
                            <div className="text-lg text-neutral-600">
                                {currentSentence.original}
                            </div>
                        </div>
                    )}
                    
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
                        <div className="w-full p-6 bg-gray-100 rounded-2xl">
                            <div className="text-center mb-6">
                                <div className="text-2xl font-bold text-stone-950 mb-4">
                                    Recording complete!
                                </div>
                                <img src="/images/OK.svg" alt="OK" className="w-8 h-8 mx-auto" />
                            </div>
                            
                            {/* Three Buttons in a Row */}
                            <div className="flex flex-row justify-center items-center gap-4">
                                <CompactButton 
                                    size="sm" 
                                    variant="skip"
                                    onClick={() => {
                                        // TODO: Replay recording
                                        console.log("Replay recording")
                                    }}
                                >
                                    Play my voice
                                </CompactButton>
                                <CompactButton 
                                    size="sm" 
                                    variant="primary"
                                    onClick={() => {
                                        // TODO: Save recording
                                        console.log("Save recording")
                                    }}
                                >
                                    Listen Again
                                </CompactButton>
                                <CompactButton 
                                    size="sm" 
                                    variant="default"
                                    onClick={() => {
                                        // TODO: Record again
                                        setShowResult(false)
                                        setIsCorrect(false)
                                    }}
                                >
                                    Record Again
                                </CompactButton>
                            </div>
                        </div>
                    )}
                    
                    {/* Action Buttons - Only show when not recording and not showing result */}
                    {!showResult && !isRecording && (
                        <div className="w-full flex flex-row justify-center items-center gap-4">
                            <div className="relative group">
                                <CompactButton 
                                    size="sm" 
                                    variant="primary" 
                                    onClick={handleStartRecording}
                                >
                                    Speak Now!
                                </CompactButton>
                                
                                {/* Tooltip */}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-white text-black text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 border border-gray-200 shadow-lg">
                                    Press the space bar to start or stop recording
                                    {/* Arrow */}
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-white"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Next Button - Positioned below the gray container in white background */}
                {showResult && (
                    <div className="w-full flex justify-end mt-6">
                        <CompactButton 
                            size="lg" 
                            variant="skip"
                            onClick={handleNext}
                            className="bg-blue-600 text-white border-white hover:bg-blue-700"
                        >
                            Next
                        </CompactButton>
                    </div>
                )}
            </div>
        </div>
    )
} 