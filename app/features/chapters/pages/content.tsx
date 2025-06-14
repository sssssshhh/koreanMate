import { useParams } from "react-router"

export default function Content(){
    const { storyId, chapterId} = useParams()
    return (
        <div>
           <h1>Story ID: {storyId}</h1>
           <h1>chapter ID: {chapterId}</h1>
        </div>
    )
}