import { useParams } from "react-router"
import { useState, useEffect } from "react"
import chaptersData from "@/features/learning/contents/chapters.json"
import sentenceMeaningData from "@/features/learning/contents/sample.json"
import { CustomProgress } from "@/common/ui/custom-progress"
import { SmallButton } from "@/common/ui/small-button"
import { CompletionPopup } from "@/features/learning/components/completion-popup"

export default function SentenceArrangement(){
    const { storyId, chapterId } = useParams()
    
    // bring chapter data from chapters.json
    const chapter = chaptersData.chapters.find(ch => ch.id === chapterId)
    const originalSentences = sentenceMeaningData.sentences.map(s => s.original)

    // bring sentence data from sample.json based on chapterId
    const [currentSentences, setCurrentSentences] = useState<any[]>([])
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
    const [progress, setProgress] = useState(0)
    const [scrambledWords, setScrambledWords] = useState<string[]>([])
    const [selectedWords, setSelectedWords] = useState<string[]>([])
    const [showResult, setShowResult] = useState<boolean>(false)
    const [isCorrect, setIsCorrect] = useState<boolean>(false)
    const [showCompletionPopup, setShowCompletionPopup] = useState<boolean>(false)

    // Split Korean text into words/phrases
    const splitIntoWords = (text: string): string[] => {
        // Split by spaces, filter out empty strings, and remove periods
        return text.split(' ').filter(word => word.trim() !== '').map(word => word.replace('.', ''))
    }

    // Shuffle array randomly
    const shuffleArray = (array: string[]): string[] => {
        const shuffled = [...array]
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }
        return shuffled
    }

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
                // Initialize scrambled words for first sentence
                const firstSentence = chapterSentences[0]
                if (firstSentence) {
                    const words = splitIntoWords(firstSentence.original)
                    setScrambledWords(shuffleArray(words))
                    setSelectedWords(new Array(words.length).fill(''))
                }
            }
        }
    }, [chapterId])

    // Update progress when sentence index changes
    useEffect(() => {
        if (currentSentences.length > 0) {
            const progressPercentage = Math.round((currentSentenceIndex / currentSentences.length) * 100)
            setProgress(progressPercentage)
            
            // Update scrambled words for current sentence
            const currentSentence = currentSentences[currentSentenceIndex]
            if (currentSentence) {
                const words = splitIntoWords(currentSentence.original)
                setScrambledWords(shuffleArray(words))
                setSelectedWords(new Array(words.length).fill(''))
            }
        }
    }, [currentSentenceIndex, currentSentences.length, currentSentences])

    // Handle word selection
    const handleWordClick = (word: string, wordIndex: number) => {
        // Find the first empty slot
        const firstEmptySlotIndex = selectedWords.findIndex(slot => slot === '')
        
        if (firstEmptySlotIndex !== -1) {
            const newSelectedWords = [...selectedWords]
            newSelectedWords[firstEmptySlotIndex] = word
            setSelectedWords(newSelectedWords)
            
            // Remove the clicked word from scrambled words
            setScrambledWords(prev => prev.filter((_, i) => i !== wordIndex))
        }
    }

    // Handle selected word removal
    const handleSelectedWordClick = (slotIndex: number) => {
        const removedWord = selectedWords[slotIndex]
        const newSelectedWords = [...selectedWords]
        newSelectedWords[slotIndex] = ''
        setSelectedWords(newSelectedWords)
        
        // Add the removed word back to scrambled words
        setScrambledWords(prev => [...prev, removedWord])
    }

    // Handle submit button click
    const handleSubmit = () => {
        const currentSentence = currentSentences[currentSentenceIndex]
        if (currentSentence) {
            const originalWords = splitIntoWords(currentSentence.original)
            const isAnswerCorrect = selectedWords.every((word, index) => word === originalWords[index])
            
            setIsCorrect(isAnswerCorrect)
            setShowResult(true)
        }
    }

    // Handle next button click
    const handleNext = () => {
        if (currentSentenceIndex < currentSentences.length - 1) {
            // Move to next sentence
            setCurrentSentenceIndex(prev => prev + 1)
            setShowResult(false)
            setIsCorrect(false)
        } else {
            // All sentences completed
            setShowResult(false)
            setIsCorrect(false)
            // Show completion popup
            setShowCompletionPopup(true)
        }
    }

    // Handle skip button click
    const handleSkip = () => {
        if (currentSentenceIndex < currentSentences.length - 1) {
            // Move to next sentence
            setCurrentSentenceIndex(prev => prev + 1)
            setShowResult(false)
            setIsCorrect(false)
        } else {
            // All sentences completed
            setShowResult(false)
            setIsCorrect(false)
            // Show completion popup
            setShowCompletionPopup(true)
        }
    }

    if (!chapter) {
        return <div>Chapter not found</div>
    }

    if (currentSentences.length === 0) {
        return (
            <div className="w-full min-h-screen bg-[#FFFDD0] flex items-center justify-center p-6">
                <div className="w-[1284px] px-6 py-14 bg-white rounded-[32px] border-l border-r border-t border-amber-200 inline-flex flex-col justify-start items-center gap-8">
                    <h2 className="text-center text-stone-950 text-2xl font-normal font-merriweather tracking-tight">
                        No sentences found for this chapter
                    </h2>
                </div>
            </div>
        )
    }

    const currentSentence = currentSentences[currentSentenceIndex]
    const wordCount = splitIntoWords(currentSentence.original).length

    return (
        <div className="w-full min-h-screen bg-[#FFFDD0] flex items-center justify-center p-6">
            <div className="w-[1284px] px-6 py-14 bg-white rounded-[32px] border-l border-r border-t border-amber-200 inline-flex flex-col justify-start items-center gap-8">
                {/* Progress Bar */}
                <CustomProgress 
                    progress={progress}
                    current={currentSentenceIndex + 1}
                    total={currentSentences.length}
                />
                
                <div className="text-center text-stone-950 text-lg lg:text-2xl font-normal font-merriweather tracking-tight px-4 lg:px-0">
                    This sentence is from the story you just read. 
                    <br />
                    Put the words in the correct order to complete it.
                </div>
                
                {/* Current Sentence Display */}
                <div className="w-[742px] px-8 py-10 bg-neutral-100 rounded-3xl flex flex-col justify-between items-center gap-8">                    
                    {/* Available Words - Top Row */}
                    <div className="w-full gap-4">
                        <div className="flex flex-wrap gap-4 justify-center">
                            {scrambledWords.map((word, index) => (
                                <div 
                                    key={`available-${index}`}
                                    className={`w-32 h-16 bg-white text-black rounded-lg flex items-center justify-center transition-colors ${
                                        !showResult ? 'hover:bg-gray-50' : 'opacity-50'
                                    }`}
                                    onClick={!showResult ? () => handleWordClick(word, index) : undefined}
                                >
                                    {word}
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Result Display */}
                    {showResult && (
                        <div className="w-full text-center">
                            <div className={`text-3xl font-bold ${
                                isCorrect ? 'text-blue-600' : 'text-red-600'
                            }`}>
                                {isCorrect ? 'Perfect!' : 'Failed'}
                            </div>
                            {isCorrect && (
                                <div className="mt-2">
                                    <img src="/images/OK.svg" alt="OK" className="w-8 h-8 mx-auto" />
                                </div>
                            )}
                        </div>
                    )}
                    
                    {/* Answer Slots - Bottom Row */}
                    <div className="w-full">
                        <div className="flex flex-wrap gap-3 justify-center">
                            {Array.from({ length: wordCount }, (_, index) => (
                                <div 
                                    key={index}
                                    className="w-32 h-16 bg-white rounded-lg flex items-center justify-center"
                                >
                                    {selectedWords[index] && (
                                        <button
                                            onClick={!showResult ? () => handleSelectedWordClick(index) : undefined}
                                            className={!showResult ? '' : 'opacity-50'}
                                        >
                                            {selectedWords[index]}
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full flex flex-row justify-center items-center gap-4">
                        {!showResult ? (
                            <>
                                <SmallButton size="sm" variant="skip" onClick={handleSkip}>
                                    Skip
                                </SmallButton>
                                <SmallButton size="sm" variant="primary" onClick={handleSubmit}>
                                    Submit
                                </SmallButton>
                            </>
                        ) : (
                            <SmallButton size="sm" variant="primary" onClick={handleNext}>
                                Next
                            </SmallButton>
                        )}
                    </div>
                </div>

                {/* Completion Popup */}
                <CompletionPopup
                    isVisible={showCompletionPopup}
                    onClose={() => setShowCompletionPopup(false)}
                    storyId={storyId}
                    chapterId={chapterId}
                />
            </div>
        </div>
    )
} 