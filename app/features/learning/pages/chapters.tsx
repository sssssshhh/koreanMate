import { useParams, Link } from "react-router"
import chaptersData from "@/features/learning/contents/chapters.json"
import { Button } from "@/common/ui/button"
import { Icon } from "@/common/ui/icon"
import { LargeButton } from "@/common/ui/large-button"

export default function Chapters(){
    const { storyId } = useParams()
    
    // bring chaper data from chapters.json
    const storyTitle = chaptersData.title
    const thumbnail = chaptersData.thumbnail
    const level = chaptersData.level
    const description = chaptersData.description
    const chapters = chaptersData.chapters

    return (
        <div className="w-full flex flex-col items-center justify-center px-28 py-20">
            <div className="w-full flex text-base font-bold font-['Pretendard'] tracking-tight">
                <Link to={'/stories'} className="text-blue-600">Learn/Story :&nbsp;</Link>
                <div>{storyTitle}</div>
            </div>
            <div className="pt-16 w-full flex flex-row gap-12">
                <img src={thumbnail} alt={storyTitle} className="w-lg h-96 rounded-lg" />
                <div className="w-full">
                    <div className="justify-start text-orange-600 text-lg font-medium font-['Pretendard'] leading-relaxed tracking-tight">
                        {level} Level
                    </div>
                    <div className="pt-6 text-stone-950 text-4xl font-bold font-['Merriweather'] leading-[56px] tracking-tight">
                        {storyTitle}
                    </div>
                    <div className="py-7 text-neutral-400 text-lg font-medium font-['Pretendard'] leading-relaxed tracking-tight max-w-2xl whitespace-pre-line">
                        {description}
                    </div>
                    <LargeButton variant="primary">
                        <span className="text-white text-base font-bold font-['Merriweather'] tracking-tight">Save lessons</span>
                        <img src="/images/star.svg" alt="star" className="w-6 h-6" />
                    </LargeButton>
                </div>
            </div>
            {/* chapters list */}
            <div className="pt-11 w-full flex flex-col items-center justify-center gap-3">
                {chapters.map((chapter, index) => (
                    <Link 
                        key={index} 
                        to={`/stories/${storyId}/chapters/${chapter.id}`}
                        className="w-full h-16 bg-white rounded-[10px] outline outline-offset-[-1px] outline-amber-200 hover:outline-amber-300 transition-colors cursor-pointer"
                    >
                        <div className="flex flex-row px-8 py-5">
                            <div className="w-16 text-orange-600 text-base font-normal font-['Lato'] leading-normal tracking-tight">
                                {chapter["chpater-number"]}
                            </div>
                            <div className="w-full pl-12 text-stone-950 text-base font-normal font-['Pretendard'] leading-normal tracking-tight">
                                {chapter["chapter-name"]}
                            </div>
                            <img src="/images/done.svg" alt="done" className="w-6 h-6" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}