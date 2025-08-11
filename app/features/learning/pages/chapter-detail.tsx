import { useParams, Link } from "react-router"
import chaptersData from "@/features/learning/contents/chapters.json"
import { Icon } from "@/common/ui/icon"
import { LargeButton } from "@/common/ui/large-button"

export default function ChapterDetail(){
    const { storyId, chapterId } = useParams()
    
    // bring chapter data from chapters.json
    const storyTitle = chaptersData.title
    const chapter = chaptersData.chapters.find(ch => ch.id === chapterId)
    
    if (!chapter) {
        return <div>Chapter not found</div>
    }

    return (
        <div className="flex justify-center w-full">
            <div className="pt-20 flex flex-col">
                {/* 브레드크럼 네비게이션 */}
                <div className="w-full flex text-base font-bold font-['Pretendard'] tracking-tight">
                    <Link to={'/stories'} className="text-blue-600">Learn/Story :&nbsp;</Link>
                    <Link to={`/stories/${storyId}/chapters`} className="text-blue-600">{storyTitle} :&nbsp;</Link>
                    <div>{chapter["chapter-name"]}</div>
                </div>

                {/* 챕터 상세 내용 */}
                <div className="pt-16 w-full flex flex-col items-center justify-center">
                    <div className="w-full max-w-4xl">
                        <div className="text-center text-stone-950 text-4xl font-bold font-['Merriweather'] leading-[56px] tracking-tight mb-8">
                            {chapter["chapter-name"]}
                        </div>
                        
                        {/* 챕터 내용 (임시) */}
                        <div className="bg-white rounded-lg p-8 shadow-sm">
                            <div className="text-neutral-600 text-lg font-medium font-['Pretendard'] leading-relaxed">
                                This is the content of {chapter["chapter-name"]}. 
                                The actual chapter content will be displayed here.
                            </div>
                        </div>

                        {/* 네비게이션 버튼들 */}
                        <div className="flex justify-between items-center mt-8">
                            <LargeButton variant="secondary">
                                <Icon name="arrow-left" className="w-4 h-4" />
                                <span>Previous</span>
                            </LargeButton>
                            
                            <LargeButton variant="primary">
                                <Icon name="arrow-right" className="w-4 h-4" />
                                <span>Next</span>
                            </LargeButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 