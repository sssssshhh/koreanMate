import { Button } from "@/common/components/ui/button";
import { Link, useParams } from "react-router";

export default function Recording() {
    const { storyId, chapterId } = useParams()
    return (
    <div>
        <h1>Recording</h1>
        <Button>
            <Link to={`/stories/${storyId}/${chapterId}/complete`}>
                Complete    
            </Link>
        </Button>
    </div>
    )
}