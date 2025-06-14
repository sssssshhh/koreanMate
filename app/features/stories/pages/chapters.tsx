import { useParams, Link } from "react-router"

export default function Chapters(){
    const { storyId } = useParams()

    return (
        <div>
            <h1>Story ID: {storyId}</h1>
            <Link
            to="/stories/story1/chapter1"
            className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
        go to content
        </Link>
        </div>
    )
}