import { useParams, Link } from "react-router"
import sampleData from "../sample.json"
import SentenceLayout from "@/features/layouts/sentenceLayout"
import AudioLayout from "@/features/layouts/audioLayout"
import QuizLayout from "@/features/layouts/quizLayout"

// http://localhost:5174/stories/story1/chapter1

export default function Content() {
    const { storyId, chapterId } = useParams()
    const content = sampleData.stories.find(s => s.id === chapterId)
    const sentences = content?.sentences
    const audios = content?.audios
    const quizes = content?.quizes
    
    return (
        <div className="p-6">
            {content && (
                <div key={content.id} className=" space-y-6 flex flex-row">
                    <div className="w-3/5">
                        <div>
                            <Link to="/" className="hover:opacity-80 transition-opacity">
                                <span className="text-sm text-blue-500">content</span>
                            </Link>
                            <span className="text-sm">/{content.title}</span>
                        </div>
                        <div className="border p-4 rounded-lg flex flex-row justify-between items-center">
                            <div>
                                <p className="mb-2">{content.level}</p>
                                <p className="text-lg text-gray-600 mb-2">{content.title}</p>
                            </div>
                            <div className="w-3/5 h-32 bg-gray-100 rounded-lg overflow-hidden">
                                <img 
                                    src={content.thumbnail || "https://placehold.co/400x400"} 
                                    alt={content.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        {sentences && <SentenceLayout sentences={sentences} />}
                        {audios && <AudioLayout audio={audios} />}
                    </div>
                    <div className="w-2/5">
                        {quizes && <QuizLayout quizes={quizes} />}
                    </div>
                </div>
            )}
        </div>
    )
}