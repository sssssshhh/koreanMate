import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router"
import chaptersData from "@/features/learning/contents/chapters.json"
import { StoryLayout } from "@/features/learning/layouts/storyLayout"
import sentenceMeaningData from "@/features/learning/contents/sample.json"
import { SearchInput } from "@/common/ui/search-input"
import { ToggleSwitch } from "@/common/ui/toggle-switch"

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
    const [isMarkedAsRead, setIsMarkedAsRead] = useState(false);
    const [hoveredItems, setHoveredItems] = useState<Set<string>>(new Set());
    const [allHoverableItems, setAllHoverableItems] = useState<Set<string>>(new Set());

    // bring chapter data from chapters.json
    const storyTitle = chaptersData.title
    const thumbnail = chaptersData.thumbnail
    const level = chaptersData.level
    const description = chaptersData.description
    const chapter = chaptersData.chapters.find(ch => ch.id === chapterId)

    // bring sentence data from sentence-meaning.json
    const sentences = sentenceMeaningData.sentences

    // 모든 hover 가능한 아이템들 계산
    useEffect(() => {
        const items = new Set<string>();
        
        filteredSentences.forEach((sentence, sentenceIndex) => {
            items.add(`sentence-${sentenceIndex}`);
            
            if (sentence.wordDefinitions) {
                sentence.wordDefinitions.forEach((_, wordIndex) => {
                    items.add(`word-${sentenceIndex}-${wordIndex}`);
                });
            }
        });
        
        setAllHoverableItems(items);
        
        console.log("🔍 allHoverableItems 계산:", {
            filteredSentencesLength: filteredSentences.length,
            allHoverableItems: Array.from(items),
            allHoverableItemsSize: items.size
        });
    }, [filteredSentences]);

    // searchQuery가 변경될 때만 hoveredItems 초기화
    useEffect(() => {
        setHoveredItems(new Set());
        setIsMarkedAsRead(false);
        console.log("🔄 검색으로 인한 초기화");
    }, [searchQuery]);

    // 모든 아이템을 hover했는지 확인하고 자동으로 "Mark as read" 설정
    useEffect(() => {
        console.log("🎯 hoveredItems 상태:", {
            hoveredItemsSize: hoveredItems.size
        });
        
        if (allHoverableItems.size > 0 && hoveredItems.size >= allHoverableItems.size) {
            setIsMarkedAsRead(true);
        }
    }, [hoveredItems, allHoverableItems]);

    // find word definition
    const findWordDefinition = (word: string) => {
        for (const sentence of sentences) {
            const wordData = sentence.wordDefinitions?.find(w => 
                w.word.toLowerCase() === word.toLowerCase()
            )
            if (wordData) {
                return wordData.definition
            }
        }
        return ""
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

    // split sentence into words and make them hoverable
    const renderHoverableSentence = (sentence: string, sentenceIndex: number) => {
        return sentence.split(' ').map((word, wordIndex) => (
            <span key={wordIndex}>
                <span
                    className="hover:bg-pink-100 hover:cursor-pointer transition-colors px-1 rounded"
                    onMouseEnter={() => {
                        setHoveredWord(word)
                        setHoveredSentenceIndex(sentenceIndex)
                        setHoveredItems(prev => new Set([...prev, `word-${sentenceIndex}-${wordIndex}`]));
                    }}
                    onMouseLeave={() => {
                        setHoveredWord("")
                        setHoveredSentenceIndex(-1)
                        setHoveredItems(prev => {
                            const newSet = new Set(prev);
                            newSet.delete(`word-${sentenceIndex}-${wordIndex}`);
                            return newSet;
                        });
                    }}
                >
                    {word}
                </span>
                {wordIndex < sentence.split(' ').length - 1 && <span> </span>}
            </span>
        ))
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
        >
            <div className="w-full flex flex-col gap-4">
                {/* Main Content and Settings */}
                <div className="w-full flex flex-col">
                    {/* Main Content Area */}
                    <div className="flex-1 flex flex-col bg-white relative">
                        {/* Settings Panel - show when filter area is clicked */}
                        {showFilterArea && (
                            <div className="absolute bottom-30 right-4 z-20 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                                <div className="flex flex-col gap-4">
                                    {/* Text Size Control */}
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium text-gray-700">Text size</label>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setTextSize(Math.max(80, textSize - 10))}
                                                className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
                                            >
                                                -
                                            </button>
                                            <span className="w-12 text-center text-sm">{textSize}%</span>
                                            <button
                                                onClick={() => setTextSize(Math.min(150, textSize + 10))}
                                                className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Pronunciation Size Control */}
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium text-gray-700">Pronunciation Guide Size</label>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setPronunciationSize(Math.max(80, pronunciationSize - 10))}
                                                className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
                                            >
                                                -
                                            </button>
                                            <span className="w-12 text-center text-sm">{pronunciationSize}%</span>
                                            <button
                                                onClick={() => setPronunciationSize(Math.min(150, pronunciationSize + 10))}
                                                className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Grammar Highlight Toggle */}
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium text-gray-700">Grammar highlight</label>
                                        <ToggleSwitch
                                            isOn={grammarHighlight}
                                            onToggle={() => setGrammarHighlight(!grammarHighlight)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Sentence and Word Meaning Section */}
                        <div className="pt-16 w-full flex flex-col items-center justify-center px-4 lg:px-0">
                            <div className="flex flex-col w-full">
                                <div className="h-20 lg:h-14 px-4 lg:px-6 py-4 lg:py-5 bg-white rounded-tl-[10px] rounded-tr-[10px] border-l border-r border-t border-amber-200 flex flex-col lg:flex-row justify-start items-start lg:items-center gap-2 lg:gap-0 overflow-hidden">
                                    <div className="w-full lg:w-32 text-neutral-400 text-sm font-semibold font-lato leading-tight tracking-tight flex-shrink-0 whitespace-nowrap">Sentence meaning</div>
                                    <div className="text-stone-950 text-lg lg:text-xl font-normal leading-relaxed lg:leading-loose tracking-wide break-words font-lato">
                                        {hoveredSentenceIndex >= 0 ? sentences[hoveredSentenceIndex].translations.en : ""}
                                    </div>
                                </div>
                                <div className="h-20 lg:h-14 px-4 lg:px-6 py-4 lg:py-5 bg-white rounded-bl-[10px] rounded-br-[10px] border-l border-r border-b border-t border-amber-200 flex flex-col lg:flex-row justify-start items-start lg:items-center gap-2 lg:gap-0 overflow-hidden">
                                    <div className="w-full lg:w-32 text-neutral-400 text-sm font-semibold font-lato leading-tight tracking-tight flex-shrink-0 whitespace-nowrap">Word meaning</div>
                                    <div className="text-stone-950 text-lg lg:text-xl font-normal leading-relaxed lg:leading-loose tracking-wide break-words font-lato">
                                        {hoveredWord ? findWordDefinition(hoveredWord) : ""}
                                    </div>
                                </div>
                                {/* Search and Filter Controls */}
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
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-5 relative bg-white rounded-tl-[10px] rounded-tr-[10px] border-l border-r border-t border-amber-200">
                            {/* Header with Mark as Read Toggle */}
                            <div className="flex justify-end items-start mb-4">
                                <ToggleSwitch
                                    isOn={isMarkedAsRead}
                                    onToggle={() => setIsMarkedAsRead(!isMarkedAsRead)}
                                    label="Mark as read"
                                    size="md"
                                    disabled={true}
                                />
                            </div>
                            
                            {/* Sentence List */}
                            <div className="flex flex-col gap-3">
                                {filteredSentences.map((sentence, index) => (
                                    <div key={index} className="flex flex-col gap-2">
                                        <div 
                                            className="text-stone-950 font-normal leading-relaxed tracking-wide hover:bg-blue-50 hover:cursor-pointer transition-colors p-2 rounded"
                                            style={{ fontSize: `${textSize}%` }}
                                            onMouseEnter={() => {
                                                setHoveredItems(prev => new Set([...prev, `sentence-${index}`]));
                                            }}
                                            onMouseLeave={() => {
                                                setHoveredItems(prev => {
                                                    const newSet = new Set(prev);
                                                    newSet.delete(`sentence-${index}`);
                                                    return newSet;
                                                });
                                            }}
                                        >
                                            {renderHoverableSentence(sentence.original, index)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Navigation */}
                        <div className="px-6 py-4 flex flex-row rounded-bl-[10px] rounded-br-[10px] outline-offset-[-1px] outline-amber-200 justify-between items-center text-sm font-semibold leading-tight tracking-tight">
                            <div className="text-neutral-400">&lt; Previous Chapter</div>
                            <div className="text-neutral-400">Story Overview</div>
                            <div className="text-neutral-400">Next Chapter &gt;</div>
                        </div>
                    </div>
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