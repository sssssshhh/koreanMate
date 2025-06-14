import { useParams, Link } from "react-router"
import sampleData from "../../content/sample.json"
import SentenceLayout from "@/features/layouts/sentenceLayout"

// http://localhost:5174/stories/story1/chapter1

export default function Content() {
    const { storyId, chapterId } = useParams()
    const content = sampleData.stories.find(s => s.id === chapterId)
    
    return (
        <div className="p-6">
            {content && (
                <div className="space-y-6">
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
                    <SentenceLayout sentences={content.sentences} />
                </div>
            )}
        </div>
    )
}