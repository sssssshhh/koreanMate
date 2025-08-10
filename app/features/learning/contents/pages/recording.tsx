import { Button } from "@/common/ui/button";
import { Link, useParams } from "react-router";
import { useState, useRef } from "react";
import sampleData from "@/features/learning/contents/sample.json"

export default function Recording() {
    const { storyId, chapterId } = useParams();
    const [isRecording, setIsRecording] = useState(false);
    const [recordings, setRecordings] = useState<Record<string, string>>({});
    const [currentSentenceId, setCurrentSentenceId] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const sentences = sampleData.story.find(s => s.id === chapterId)?.recordingSentences || [];

    const startRecording = async (sentenceId: string) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                setRecordings(prev => ({
                    ...prev,
                    [sentenceId]: audioUrl
                }));
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
            setCurrentSentenceId(sentenceId);
        } catch (error) {
            console.error('마이크 접근 권한이 필요합니다:', error);
            alert('마이크 접근 권한을 허용해주세요.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            setCurrentSentenceId(null);
        }
    };

    const playRecording = (audioUrl: string) => {
        const audio = new Audio(audioUrl);
        audio.play();
    };

    const deleteRecording = (sentenceId: string) => {
        setRecordings(prev => {
            const newRecordings = { ...prev };
            delete newRecordings[sentenceId];
            return newRecordings;
        });
    };

    const isAllRecorded = sentences.length > 0 && 
        sentences.every(sentence => recordings[sentence.id]);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">음성 녹음 연습</h1>
            
            <div className="space-y-4">
                {sentences.map((sentence, index) => {
                    const hasRecording = recordings[sentence.id];
                    const isCurrentlyRecording = currentSentenceId === sentence.id && isRecording;

                    return (
                        <div 
                            key={sentence.id} 
                            className="border rounded-lg p-4 bg-white shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-lg font-semibold">
                                    문장 {index + 1}
                                </h2>
                                <span className="text-sm text-gray-500">
                                    {hasRecording ? '✅ 녹음 완료' : '⏺️ 녹음 필요'}
                                </span>
                            </div>
                            
                            <p className="text-gray-700 mb-4 text-lg">
                                {sentence.recordingSentence}
                            </p>

                            <div className="flex gap-2 flex-wrap">
                                {!hasRecording ? (
                                    <Button
                                        onClick={() => isCurrentlyRecording 
                                            ? stopRecording() 
                                            : startRecording(sentence.id)
                                        }
                                        variant={isCurrentlyRecording ? "destructive" : "default"}
                                        disabled={isRecording && !isCurrentlyRecording}
                                    >
                                        {isCurrentlyRecording ? '⏹️ 녹음 중지' : '🎤 녹음 시작'}
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            onClick={() => playRecording(recordings[sentence.id])}
                                            variant="outline"
                                        >
                                            🔊 재생
                                        </Button>
                                        <Button
                                            onClick={() => deleteRecording(sentence.id)}
                                            variant="outline"
                                            className="text-red-600"
                                        >
                                            🗑️ 삭제
                                        </Button>
                                        <Button
                                            onClick={() => startRecording(sentence.id)}
                                            variant="outline"
                                        >
                                            🔄 다시 녹음
                                        </Button>
                                    </>
                                )}
                            </div>

                            {isCurrentlyRecording && (
                                <div className="mt-2 text-red-500 text-sm">
                                    ��️ 녹음 중... (중지하려면 버튼을 클릭하세요)
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 flex justify-between items-center">
                <Button variant="outline">
                    <Link to={`/stories/${storyId}/${chapterId}`}>
                        ← 이전으로
                    </Link>
                </Button>

                {isAllRecorded && (
                    <Button className="bg-green-600 hover:bg-green-700">
                        <Link to={`/stories/${storyId}/${chapterId}/complete`}>
                            ✅ 완료하기
                        </Link>
                    </Button>
                )}
            </div>

            {!isAllRecorded && sentences.length > 0 && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800">
                        모든 문장을 녹음해야 완료할 수 있습니다.
                    </p>
                </div>
            )}
        </div>
    );
}