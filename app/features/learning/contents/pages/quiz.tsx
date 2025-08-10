import type { Quiz } from "@/features/learning/contents/types";
import sampleData from "@/features/learning/contents/sample.json"
import { useState } from "react";
import { Link, useParams } from "react-router";
import { Button } from "@/common/ui/button";

export default function Quiz() {
const { storyId, chapterId } = useParams()
const quizes = sampleData.story.find(s => s.id === chapterId)?.quizes;

const [quizIdx, setQuizIdx] = useState(0)
const [selected, setSelected] = useState<string[]>([])
const [submitted, setSubmitted] = useState(false)
const currentQuiz = quizes?.[quizIdx]

const handleSelect = (word: string) => {
if (selected.includes(word)) {      
    setSelected(selected.filter(w => w !== word))
} else {
    setSelected([...selected, word])
}
}

const handleSubmit = () => {
    setSubmitted(true)  
}

const gotoNextQuiz = () => {
    setQuizIdx(quizIdx + 1)
    setSelected([])
    setSubmitted(false)
}

return (quizes && quizes.length > 0 ? 
    <div>
        <header>
            <h1>문장배열연습!</h1>
        </header>
        <div className="flex flex-col font-semibold">
            <div>방금 읽은 스토리 속 문장이에요</div>
            <div>단어 조각들 {quizIdx + 1}/{quizes.length}</div>
        </div>
        <div className="flex flex-wrap gap-2">
            {currentQuiz?.words.map((word, idx) => (
            <button key={idx} onClick={() => handleSelect(word)} 
            className="bg-gray-100 px-2 py-1 rounded-md">
                {word}  
            </button>
            ))}
        </div>

        <div>
            <p className="text-sm">
            <div className="flex flex-row gap-2">
                {selected.map((word, idx) => (
                <div key={idx} className="bg-gray-100 px-2 py-1 rounded-md">
                    {word}
                </div>
                ))}
            </div>
            </p>
        </div>

        <div className="flex flex-row gap-2">
            <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                제출하기
            </button>
            {submitted && quizes.length > quizIdx + 1 && (
            <div onClick={gotoNextQuiz} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                다음 문제
            </div>
            )}

            {submitted && quizes.length === quizIdx + 1 &&
                <Button>        
                    <Link to={`/stories/${storyId}/${chapterId}/recording`}>
                        Go to Recording
                    </Link>
                </Button>}
        </div>

        {submitted && (
            <div>
                <p>정답: {currentQuiz?.answer.join(" ")}</p>
                <p>설명: {currentQuiz?.explanation}</p>
            </div>
        )}
    </div>
: <div>This chapter has no quiz</div>)
}