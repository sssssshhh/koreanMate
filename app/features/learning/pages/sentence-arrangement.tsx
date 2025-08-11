import { useParams } from "react-router"
import { useState, useEffect } from "react"
import chaptersData from "@/features/learning/contents/chapters.json"
import sentenceMeaningData from "@/features/learning/contents/sample.json"
import { CustomProgress } from "@/common/ui/custom-progress"

export default function SentenceArrangement(){
    const { storyId, chapterId } = useParams()
    
    // bring chapter data from chapters.json
    const storyTitle = chaptersData.title
    const thumbnail = chaptersData.thumbnail
    const level = chaptersData.level
    const description = chaptersData.description
    const chapter = chaptersData.chapters.find(ch => ch.id === chapterId)

    // bring sentence data from sample.json based on chapterId
    const [currentSentences, setCurrentSentences] = useState<any[]>([])
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
    const [progress, setProgress] = useState(0)

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
                    This sentence is from the story you just read. 
                    <br />
                    Put the words in the correct order to complete it.
                </h2>
                
                {/* Current Sentence Display */}
                <div className="w-[742px] px-8 py-10 bg-neutral-100 rounded-3xl inline-flex flex-col justify-between items-center gap-6">
                    

                </div>
            </div>
        </div>
    )
} 