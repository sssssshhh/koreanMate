import { useParams } from "react-router"
import chaptersData from "@/features/learning/contents/chapters.json"
import { Icon } from "@/common/ui/icon"
import { LargeButton } from "@/common/ui/large-button"
import { StoryLayout } from "@/features/learning/layouts/StoryLayout"
import sentenceMeaningData from "@/features/learning/contents/sample.json"
import { SearchInput } from "@/common/ui/search-input"

export default function ChapterDetail(){
    const { storyId, chapterId } = useParams()
    
    // bring chapter data from chapters.json
    const storyTitle = chaptersData.title
    const thumbnail = chaptersData.thumbnail
    const level = chaptersData.level
    const description = chaptersData.description
    const chapter = chaptersData.chapters.find(ch => ch.id === chapterId)

    // bring sentence data from sentence-meaning.json
    const sentences = sentenceMeaningData.sentences

    
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
                        <div className="text-stone-950 text-xl font-normal font-['Pretendard'] leading-loose tracking-wide">1</div>
                    </div>
                    <div className="h-14 px-6 py-5 bg-white rounded-bl-[10px] rounded-br-[10px] border-l border-r border-b border-t border-amber-200 inline-flex justify-start items-center">
                        <div className="w-32 text-neutral-400 text-sm font-semibold font-['Lato'] leading-tight tracking-tight">Word meaning</div>
                        <div className="text-stone-950 text-xl font-normal font-['Pretendard'] leading-loose tracking-wide">2</div>
                    </div>
                </div>
            </div>
            <div className="py-3 flex flex-row w-full items-center justify-end gap-3">
                <SearchInput
                    placeholder="Search words or pronunciation"
                    icon="search"
                    iconPosition="right"
                />
                <div className="w-10 h-10 rounded-full outline outline-amber-200 flex items-center justify-center">
                    <img src="/images/cirlce3.svg" alt="circle3" className="w-4 h-4" />
                </div>
            </div>
            <div className="w-full flex flex-col bg-white">
                <div className="px-6 py-5 relative bg-white rounded-tl-[10px] rounded-tr-[10px] border-l border-r border-t border-amber-200 flex flex-col gap-3">
                    {sentences.map((sentence, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <div className="text-stone-950 text-xl font-normal leading-relaxed tracking-wide">
                                {sentence.original}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="px-6 py-4 flex flex-row rounded-bl-[10px] rounded-br-[10px] outline outline-1 outline-offset-[-1px] outline-amber-200 justify-between items-center text-sm font-semibold leading-tight tracking-tight">
                    <div className="text-neutral-400">&lt; Previous Chapter</div>
                    <div className="text-stone-950">Story Overview</div>
                    <div className="text-neutral-400">Next Chapter &gt;</div>
                </div>
            </div>

        </StoryLayout>
    )
} 