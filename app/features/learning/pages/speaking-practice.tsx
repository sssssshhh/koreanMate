import { useParams, useNavigate } from "react-router"
import { useState, useEffect } from "react"
import chaptersData from "@/features/learning/contents/chapters.json"
import sentenceMeaningData from "@/features/learning/contents/sample.json"
import { CustomProgress } from "@/common/ui/custom-progress"
import { SmallButton } from "@/common/ui/small-button"
import { useAuth } from "@/features/auth/contexts/AuthContext"
// S3 upload will be handled by backend API to avoid CORS issues

export default function SpeakingPractice() {
    const { storyId, chapterId } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    
    // S3 upload will be handled by backend API
    
    // bring chapter data from chapters.json
    const chapter = chaptersData.chapters.find(ch => ch.id === chapterId)
    
    // bring sentence data from sample.json based on chapterId
    const [currentSentences, setCurrentSentences] = useState<any[]>([])
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
    const [progress, setProgress] = useState(0)
    const [isRecording, setIsRecording] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)
    
    // Recording states
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
    const [audioChunks, setAudioChunks] = useState<Blob[]>([])
    const [audioUrl, setAudioUrl] = useState<string>("")
    const [recordingTime, setRecordingTime] = useState(0)
    const [recordingTimer, setRecordingTimer] = useState<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (chapterId) {
            // Find sentences for the current chapter
            const chapterSentences = sentenceMeaningData.chapterId === chapterId 
                ? sentenceMeaningData.sentences 
                : []
            
            setCurrentSentences(chapterSentences)
            
            // Calculate initial progress
            if (chapterSentences.length > 0) {
                setProgress(0)
            }
        }
    }, [chapterId])

    // Update progress when sentence index changes
    useEffect(() => {
        if (currentSentences.length > 0) {
            const progressPercentage = Math.round((currentSentenceIndex / currentSentences.length) * 100)
            setProgress(progressPercentage)
        }
    }, [currentSentenceIndex, currentSentences.length])

    // Cleanup function for recording
    useEffect(() => {
        return () => {
            if (recordingTimer) {
                clearInterval(recordingTimer)
            }
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl)
            }
        }
    }, [recordingTimer, audioUrl])

    // Initialize MediaRecorder
    const initializeRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100
                } 
            })
            
            // Get supported MIME types
            const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') 
                ? 'audio/webm;codecs=opus' 
                : 'audio/webm'
            
            const recorder = new MediaRecorder(stream, { mimeType })
            
            // Local array to collect audio chunks
            let localAudioChunks: Blob[] = []
            
            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    localAudioChunks.push(event.data)
                    setAudioChunks(prev => [...prev, event.data])
                    console.log('Data available:', event.data.size, 'bytes, Total chunks:', localAudioChunks.length)
                }
            }
            
            recorder.onstop = async () => {
                try {
                    console.log('Recording stopped. Total chunks collected:', localAudioChunks.length)
                    
                    if (localAudioChunks.length === 0) {
                        alert('No audio data was recorded. Please try again.')
                        return
                    }
                    
                    const audioBlob = new Blob(localAudioChunks, { type: mimeType })
                    console.log('Audio blob size:', audioBlob.size, 'bytes')
                    
                    if (audioBlob.size === 0) {
                        alert('Recording failed. Please try again.')
                        return
                    }
                    
                    const url = URL.createObjectURL(audioBlob)
                    setAudioUrl(url)
                    
                    // Upload to S3
                    try {
                        const s3Key = await uploadToS3(audioBlob)
                        console.log('Recording uploaded to S3:', s3Key)
                        
                        // Also download locally for user convenience
                        const link = document.createElement('a')
                        link.href = url
                        const extension = mimeType.includes('webm') ? 'webm' : 'wav'
                        link.download = `recording-${Date.now()}.${extension}`
                        link.click()
                        
                        setShowResult(true)
                        setIsCorrect(true)
                    } catch (uploadError) {
                        console.error('S3 upload failed:', uploadError)
                        alert('Failed to upload to S3. Please try again.')
                        
                        // Still show result and download locally
                        const link = document.createElement('a')
                        link.href = url
                        const extension = mimeType.includes('webm') ? 'webm' : 'wav'
                        link.download = `recording-${Date.now()}.${extension}`
                        link.click()
                        
                        setShowResult(true)
                        setIsCorrect(true)
                    }
                    
                    // Stop all tracks
                    stream.getTracks().forEach(track => track.stop())
                } catch (error) {
                    console.error('Error processing recording:', error)
                    alert('failed to upload to S3')
                }
            }
            
            setMediaRecorder(recorder)
            return recorder
        } catch (error) {
            console.error('Error accessing microphone:', error)
            alert('Please allow microphone access to record your voice.')
            return null
        }
    }

    const handleStartRecording = async () => {
        try {
            // Reset states
            setAudioChunks([])
            setRecordingTime(0)
            setIsRecording(true)
            
            console.log('Starting recording...')
            
            const recorder = await initializeRecording()
            if (!recorder) {
                setIsRecording(false)
                return
            }
            
            // Start recording with timeslice to ensure ondataavailable events
            recorder.start(1000) // Collect data every 1 second
            
            // Start timer
            const timer = setInterval(() => {
                setRecordingTime(prev => prev + 1)
            }, 1000)
            setRecordingTimer(timer)
            
        } catch (error) {
            console.error('Error starting recording:', error)
            setIsRecording(false)
        }
    }

    const handleStopRecording = () => {
        if (mediaRecorder && isRecording) {
            console.log('Stopping recording...')
            console.log('Audio chunks count:', audioChunks.length)
            
            mediaRecorder.stop()
            setIsRecording(false)
            
            // Stop timer
            if (recordingTimer) {
                clearInterval(recordingTimer)
                setRecordingTimer(null)
            }
        }
    }

    const handlePlayRecording = () => {
        if (audioUrl) {
            const audio = new Audio(audioUrl)
            audio.play()
        }
    }

    const handleRecordAgain = () => {
        setShowResult(false)
        setIsCorrect(false)
        setAudioUrl("")
        setAudioChunks([])
        setRecordingTime(0)
        
        // Reset MediaRecorder
        if (mediaRecorder) {
            setMediaRecorder(null)
        }
        
        console.log('Reset for new recording')
    }

    // Upload recording to S3 via API Gateway + Lambda
    const uploadToS3 = async (audioBlob: Blob) => {
        try {
            // Check if user is authenticated
            if (!user?.sub) {
                throw new Error('User not authenticated')
            }
            
            // Generate unique filename with user ID
            const timestamp = Date.now()
            const randomId = Math.random().toString(36).substring(2, 15)
            const key = `koreanmate/recordings/${user.sub}/${storyId}/${chapterId}/${timestamp}_${randomId}.webm`
            
            // Convert Blob to base64 for API upload
            const arrayBuffer = await audioBlob.arrayBuffer()
            const base64Data = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
            
            console.log('Uploading recording to API...', {
                userId: user.sub,
                storyId,
                chapterId,
                sentenceIndex: currentSentenceIndex,
                fileName: key
            })
            
            // Upload via API Gateway endpoint
            const response = await fetch('https://cs25bxmgp7.execute-api.us-east-1.amazonaws.com/v1/stories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // User identification
                    userId: user.sub,
                    userEmail: user.email || '',
                    
                    // Recording data
                    audioData: base64Data,
                    fileName: key,
                    contentType: 'audio/webm',
                    
                    // Context information
                    storyId: storyId || '',
                    chapterId: chapterId || '',
                    sentenceIndex: currentSentenceIndex,
                    sentenceText: currentSentence?.original || '',
                    
                    // Metadata
                    metadata: {
                        storyId: storyId || '',
                        chapterId: chapterId || '',
                        timestamp: timestamp.toString(),
                        recordingType: 'speaking-practice',
                        sentenceIndex: currentSentenceIndex,
                        sentenceText: currentSentence?.original || '',
                        userId: user.sub,
                        userEmail: user.email || ''
                    }
                })
            })
            
            if (!response.ok) {
                const errorText = await response.text()
                throw new Error(`Upload failed: ${response.status} - ${errorText}`)
            }
            
            const result = await response.json()
            console.log('Successfully uploaded to S3 via API:', key, result)
            return key
            
        } catch (error) {
            console.error('Error uploading to S3:', error)
            throw error
        }
    }

    const handleNext = () => {
        if (currentSentenceIndex < currentSentences.length - 1) {
            setCurrentSentenceIndex(prev => prev + 1)
            setShowResult(false)
            setIsCorrect(false)
        } else {
            // All sentences completed - Navigate to completion page
            if (storyId && chapterId) {
                navigate(`/stories/${storyId}/chapters/${chapterId}/completion`)
            }
        }
    }

    if (!chapter) {
        return <div>Chapter not found</div>
    }

    if (currentSentences.length === 0) {
        return (
            <div className="w-full min-h-screen bg-[#FFFDD0] flex items-center justify-center p-6">
                <div className="w-[1284px] px-6 py-14 bg-white rounded-[32px] border-l border-r border-t border-amber-200 inline-flex flex-col justify-start items-center gap-8">
                    <div className="py-8 text-center text-stone-950 text-2xl font-normal font-merriweather tracking-tight">
                    This sentence is from the story you just read. 
                    <br />
                    Try reading it out loud in Korean.
                    </div>
                </div>
            </div>
        )
    }

    const currentSentence = currentSentences[currentSentenceIndex]
    
    // Add safety check for currentSentence
    if (!currentSentence) {
        return (
            <div className="w-full min-h-screen bg-[#FFFDD0] flex items-center justify-center p-6">
                <div className="w-[1284px] px-6 py-14 bg-white rounded-[32px] border-l border-r border-t border-amber-200 inline-flex flex-col justify-start items-center gap-8">
                    <div className="py-8 text-center text-stone-950 text-2xl font-normal font-merriweather tracking-tight">
                        Loading sentence...
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full min-h-screen bg-[#FFFDD0] flex items-center justify-center">
            <div className="w-full lg:w-[1284px] px-6 py-14 bg-white rounded-[32px] border-l border-r border-t border-amber-200 inline-flex flex-col justify-start items-center gap-8">
                {/* Progress Bar */}
                <CustomProgress 
                    progress={progress}
                    current={currentSentenceIndex + 1}
                    total={currentSentences.length}
                />
                
                <div className="text-center text-stone-950 text-2xl font-normal font-merriweather tracking-tight">
                    {!showResult && (
                        <>
                            Practice speaking the sentences out loud
                            <br />
                            Listen carefully and repeat what you hear.
                        </>
                    )}
                </div>
                
                {/* Current Sentence Display */}
                <div className="w-full lg:w-[742px] px-8 py-10 bg-neutral-100 rounded-3xl flex flex-col justify-between items-center gap-8">                    
                    {/* Speaker Icon - Only show when not showing result */}
                    {!showResult && (
                        <div className="relative group">
                            <div 
                                className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors"
                                onClick={isRecording ? handleStopRecording : handleStartRecording}
                            >
                                <img 
                                    src={isRecording ? "/images/pause.svg" : "/images/speaker.svg"} 
                                    alt={isRecording ? "pause" : "speaker"} 
                                    className="w-8 h-8" 
                                />
                            </div>
                            
                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-white text-black text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 border border-gray-200 shadow-lg">
                                {isRecording ? "Click to stop recording" : "Click to start recording"}
                                {/* Arrow */}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
                            </div>
                        </div>
                    )}
                    
                    {/* Sentence Display - Only show when not showing result */}
                    {!showResult && (
                        <div className="w-full text-center">
                            <div className="text-blue-600 text-lg font-bold font-merriweather leading-relaxed tracking-tight">
                                Now say it yourself.
                            </div>
                            <div className="text-lg text-neutral-600">
                                {currentSentence.original}
                            </div>
                        </div>
                    )}
                    
                    {/* Recording Status */}
                    {isRecording && (
                        <div className="text-center">
                            <div className="text-blue-600 text-xl font-medium mb-2">
                                Recording... {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
                            </div>
                            <div className="w-6 h-6 bg-red-500 rounded-full animate-pulse mx-auto mb-4"></div>
                            <button 
                                onClick={handleStopRecording}
                                className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                                Stop Recording
                            </button>
                        </div>
                    )}
                    
                    {/* Result Display */}
                    {showResult && (
                        <div className="w-full p-6 bg-gray-100 rounded-2xl">
                            <div className="text-center mb-6">
                                <div className="text-2xl font-bold text-stone-950 mb-4">
                                    Recording complete!
                                </div>
                                <img src="/images/OK.svg" alt="OK" className="w-8 h-8 mx-auto" />
                            </div>
                            
                            {/* Three Buttons in a Row */}
                            <div className="flex flex-row justify-center items-center gap-4">
                                <SmallButton 
                                    size="sm" 
                                    variant="skip"
                                    onClick={handlePlayRecording}
                                >
                                    Play my voice
                                </SmallButton>
                                <SmallButton 
                                    size="sm" 
                                    variant="primary"
                                    onClick={() => {
                                        // 녹음 파일이 S3에 업로드됨
                                        alert('녹음 파일이 S3에 업로드되었습니다!')
                                    }}
                                >
                                    S3 Uploaded
                                </SmallButton>
                                <SmallButton 
                                    size="sm" 
                                    variant="default"
                                    onClick={handleRecordAgain}
                                >
                                    Record Again
                                </SmallButton>
                            </div>
                        </div>
                    )}
                    
                    {/* Action Buttons - Only show when not recording and not showing result */}
                    {!showResult && !isRecording && (
                        <div className="w-full flex flex-row justify-center items-center gap-4">
                            <div className="relative group">
                                <SmallButton 
                                    size="sm" 
                                    variant="primary" 
                                    onClick={handleStartRecording}
                                >
                                    Speak Now!
                                </SmallButton>
                                
                                {/* Tooltip */}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-white text-black text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 border border-gray-200 shadow-lg">
                                    Press the space bar to start or stop recording
                                    {/* Arrow */}
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-white"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Next Button - Positioned below the gray container in white background */}
                {showResult && (
                    <div className="w-full flex justify-center lg:justify-end mt-6">
                        <SmallButton 
                            size="lg" 
                            variant="skip"
                            onClick={handleNext}
                            className="bg-blue-600 text-white border-white hover:bg-blue-700"
                        >
                            Next
                        </SmallButton>
                    </div>
                )}
            </div>
        </div>
    )
} 