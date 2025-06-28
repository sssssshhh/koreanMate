import { Button } from "@/common/components/ui/button";
import { Link, useParams } from "react-router";

export default function Complete() {
    const { storyId, chapterId } = useParams()

    // chapterId에서 숫자 부분만 추출하여 다음 챕터 번호 계산
    const getNextChapterId = (currentChapterId: string) => {
        // "chapter1" -> "1" 추출
        const match = currentChapterId.match(/chapter(\d+)/);
        if (match) {
            const currentNumber = parseInt(match[1]);
            const nextNumber = currentNumber + 1;
            return `chapter${nextNumber}`;
        }
        // 매치되지 않으면 기본값 반환
        return "chapter1";
    };
    
    return (
        <div>
            <Button>
                <Link to={`/stories/${storyId}/${getNextChapterId(chapterId || "chapter1")}`}>
                    Next Chapter
                </Link>
            </Button>
        </div>
    )
}