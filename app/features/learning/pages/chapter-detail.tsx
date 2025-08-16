import { useParams, Link } from "react-router"
import { useState } from "react"
import chaptersData from "@/features/learning/contents/chapters.json"
import { StoryLayout } from "@/features/learning/layouts/storyLayout"
import sentenceMeaningData from "@/features/learning/contents/sample.json"
import { SearchInput } from "@/common/ui/search-input"

export default function ChapterDetail(){
    const { storyId, chapterId } = useParams()
    const [hoveredWord, setHoveredWord] = useState<string>("")
    const [hoveredSentenceIndex, setHoveredSentenceIndex] = useState<number>(-1)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [filteredSentences, setFilteredSentences] = useState(sentenceMeaningData.sentences)
    const [showFilterArea, setShowFilterArea] = useState<boolean>(false)
    const [textSize, setTextSize] = useState<number>(100)
    const [pronunciationSize, setPronunciationSize] = useState<number>(100)
    const [grammarHighlight, setGrammarHighlight] = useState<boolean>(true)
    
    // bring chapter data from chapters.json
    const storyTitle = chaptersData.title
    const thumbnail = chaptersData.thumbnail
    const level = chaptersData.level
    const description = chaptersData.description
    const chapter = chaptersData.chapters.find(ch => ch.id === chapterId)

    // bring sentence data from sentence-meaning.json
    const sentences = sentenceMeaningData.sentences

    // find word definition
    const findWordDefinition = (word: string) => {
        // search through all sentences' wordDefinitions
        for (const sentence of sentences) {
            const wordData = sentence.wordDefinitions?.find(w => 
                w.word.toLowerCase() === word.toLowerCase()
            )
            if (wordData) {
                return wordData.definition
            }
        }
        return "Definition not found"
    }

    // split sentence into words and make them hoverable
    const renderHoverableSentence = (sentence: string, sentenceIndex: number) => {
        return sentence.split(' ').map((word, wordIndex) => (
            <span key={wordIndex}>
                <span
                    className="hover:bg-pink-100 hover:cursor-pointer transition-colors px-1 rounded"
                    onMouseEnter={() => {
                        setHoveredWord(word)
                        setHoveredSentenceIndex(sentenceIndex)
                    }}
                    onMouseLeave={() => {
                        setHoveredWord("")
                        setHoveredSentenceIndex(-1)
                    }}
                >
                    {word}
                </span>
                {wordIndex < sentence.split(' ').length - 1 && <span> </span>}
            </span>
        ))
    }
    
    // search function
    const handleSearch = (query: string) => {
        setSearchQuery(query)
        if (!query.trim()) {
            setFilteredSentences(sentences)
            return
        }
        
        const filtered = sentences.filter(sentence => 
            sentence.original.toLowerCase().includes(query.toLowerCase()) ||
            sentence.pronunciation.toLowerCase().includes(query.toLowerCase())
        )
        setFilteredSentences(filtered)
    }

    if (!chapter) {
        return <div>Chapter not found</div>
    }

    return (
        <StoryLayout 
            storyTitle={storyTitle}
            thumbnail={thumbnail}
            level={level}
            description={description}
            showSaveButton={false}
            breadcrumbItems={[
                { text: "Learn/Story", link: "/stories" },
                { text: storyTitle, link: `/stories/${storyId}/chapters` },
                { text: chapter["chapter-name"], isCurrent: true }
            ]}
        >
            {/* Chapter Detail Content */}
            <div className="pt-16 w-full flex flex-col items-center justify-center">
                <div className="flex flex-col w-full">
                    <div className="h-14 px-6 py-5 bg-white rounded-tl-[10px] rounded-tr-[10px] border-l border-r border-t border-amber-200 inline-flex justify-start items-center">
                        <div className="w-32 text-neutral-400 text-sm font-semibold font-['Lato'] leading-tight tracking-tight">Sentence meaning</div>
                        <div className="text-stone-950 text-xl font-normal leading-loose tracking-wide">
                            {hoveredSentenceIndex >= 0 ? sentences[hoveredSentenceIndex].translations.en : ""}
                        </div>
                    </div>
                    <div className="h-14 px-6 py-5 bg-white rounded-bl-[10px] rounded-br-[10px] border-l border-r border-b border-t border-amber-200 inline-flex justify-start items-center">
                        <div className="w-32 text-neutral-400 text-sm font-semibold font-['Lato'] leading-tight tracking-tight">Word meaning</div>
                        <div className="text-stone-950 text-xl font-normal leading-loose tracking-wide">
                            {hoveredWord ? findWordDefinition(hoveredWord) : ""}
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-3 flex flex-row w-full items-center justify-end gap-3 relative">
                <SearchInput
                    placeholder="Search words or pronunciation"
                    icon="search"
                    iconPosition="right"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <button 
                    onClick={() => setShowFilterArea(!showFilterArea)}
                    className="w-10 h-10 rounded-full outline outline-amber-200 flex items-center justify-center hover:outline-amber-300 transition-colors cursor-pointer"
                >
                    <img src="/images/cirlce3.svg" alt="circle3" className="w-4 h-4" />
                </button>
                
                {/* Filter Area - shown when button is clicked */}
                {showFilterArea && (
                    <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-[10px] outline outline-1 outline-amber-200 p-4 shadow-lg z-10">
                        <div className="flex flex-col gap-4">
                            {/* Text Size */}
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">Text size</span>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => setTextSize(Math.max(0, textSize - 10))}
                                        className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm font-bold"
                                    >
                                        -
                                    </button>
                                    <span className="w-12 text-center text-sm">{textSize}%</span>
                                    <button 
                                        onClick={() => setTextSize(Math.min(200, textSize + 10))}
                                        className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            
                            {/* Pronunciation Guide Size */}
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">Pronunciation Guide Size</span>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => setPronunciationSize(Math.max(80, pronunciationSize - 10))}
                                        className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm font-bold"
                                    >
                                        -
                                    </button>
                                    <span className="w-12 text-center text-sm">{pronunciationSize}%</span>
                                    <button 
                                        onClick={() => setPronunciationSize(Math.min(150, pronunciationSize + 10))}
                                        className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            
                            {/* Grammar Highlight */}
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-700">Grammar highlight</span>
                                <button 
                                    onClick={() => setGrammarHighlight(!grammarHighlight)}
                                    className={`w-10 h-6 rounded-full transition-colors ${
                                        grammarHighlight ? 'bg-blue-500' : 'bg-gray-300'
                                    }`}
                                >
                                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                                        grammarHighlight ? 'translate-x-4' : 'translate-x-0'
                                    }`} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* sentence arrangement */}
            <div className="w-full flex flex-col bg-white">
                <div className="px-6 py-5 relative bg-white rounded-tl-[10px] rounded-tr-[10px] border-l border-r border-t border-amber-200 flex flex-col gap-3">
                    {filteredSentences.map((sentence, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <div 
                                className="text-stone-950 font-normal leading-relaxed tracking-wide"
                                style={{ fontSize: `${textSize}%` }}
                            >
                                {renderHoverableSentence(sentence.original, index)}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="px-6 py-4 flex flex-row rounded-bl-[10px] rounded-br-[10px] outline outline-1 outline-offset-[-1px] outline-amber-200 justify-between items-center text-sm font-semibold leading-tight tracking-tight">
                    <div className="text-neutral-400">&lt; Previous Chapter</div>
                    <div className="text-stone-950">Story Overview</div>
                    <div className="text-neutral-400">Next Chapter &gt;</div>
                </div>
                
                {/* Practice Navigation */}
                <div className="mt-4 flex justify-center">
                    <Link 
                        to={`/stories/${storyId}/chapters/${chapterId}/sentence-arrangement`}
                        className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors font-medium"
                    >
                        Practice Sentence Arrangement
                    </Link>
                </div>
            </div>
        </StoryLayout>
    )
} 