import { useParams, Link } from "react-router"
import chaptersData from "@/features/learning/contents/chapters.json"
import { StoryLayout } from "@/features/learning/layouts/storyLayout"

export default function Chapters(){
    const { storyId } = useParams()
    
    // bring chapter data from chapters.json
    const storyTitle = chaptersData.title
    const thumbnail = chaptersData.thumbnail
    const level = chaptersData.level
    const description = chaptersData.description
    const chapters = chaptersData.chapters

    return (
        <StoryLayout 
            storyTitle={storyTitle}
            thumbnail={thumbnail}
            level={level}
            description={description}
            showSaveButton={true}
            breadcrumbItems={[
                { text: "Learn/Story", link: "/stories" },
                { text: storyTitle, isCurrent: true }
            ]}
        >
            {/* Chapter List */}
            <div className="pt-11 w-full flex flex-col items-center justify-center gap-3 px-4 lg:px-0">
                {chapters.map((chapter, index) => (
                    <Link 
                        key={index} 
                        to={`/stories/${storyId}/chapters/${chapter.id}`}
                        className="w-full h-auto lg:h-16 bg-white rounded-[10px] outline outline-offset-[-1px] outline-amber-200 hover:outline-amber-300 transition-colors cursor-pointer"
                    >
                        <div className="flex flex-row px-4 lg:px-8 py-4 lg:py-5">
                            <div className="w-20 text-orange-600 text-base font-normal font-lato whitespace-nowrap">
                                {chapter["chpater-number"]}
                            </div>
                            <div className="w-full pl-4 lg:pl-12 text-stone-950 text-base font-normal font-pretendard whitespace-nowrap">
                                {chapter["chapter-name"]}
                            </div>
                            <img src="/images/done.svg" alt="done" className="w-6 h-6 flex-shrink-0" />
                        </div>
                    </Link>
                ))}
            </div>
        </StoryLayout>
    )
}