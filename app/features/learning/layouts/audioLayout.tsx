import type { Audio } from "@/features/content/types";
import { useEffect, useRef, useState } from "react";

export default function AudioLayout({ audios }: { audios: Audio[] }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1.0)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const speedOptions = [1.0, 1.25, 1.5, 1.75, 2.0]
  const getNextSpeed = (current: number): number => {
    const idx = speedOptions.indexOf(current)
    return speedOptions[(idx + 1) % speedOptions.length]
  }

  const playNextAudio = () => {
    if (currentIndex === null) return

    const nextIndex = currentIndex + 1
    if (nextIndex < audios.length) {
      setCurrentIndex(nextIndex)
      const audioElement = audioRef.current
      if (audioElement) {
        audioElement.src = audios[nextIndex].audio
        audioElement.play()
      }
    } else {
      // When the last audio is played
      setIsPlaying(false)
      setCurrentIndex(null)
    }
  }

  const togglePlayback = () => {
    const audioElement = audioRef.current
    if (!audioElement) return
  
    if (isPlaying) {
      // ⏸️ temporary pause
      audioElement.pause()
      setIsPlaying(false)
    } else {
      // ▶️ play again
      if (currentIndex === null) {
        setCurrentIndex(0)
        audioElement.src = audios[0].audio
      }
      audioElement.play()
      setIsPlaying(true)
    }
  }

  const handleSpeedClick = () => {
    const nextSpeed = getNextSpeed(speed)
    setSpeed(nextSpeed)
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed
    }
  }

  // 10초 뒤로 이동
  const skipBackward = () => {
    const audioElement = audioRef.current
    if (!audioElement) return
    
    const newTime = Math.max(0, audioElement.currentTime - 10)
    audioElement.currentTime = newTime
  }

  // 10초 앞으로 이동
  const skipForward = () => {
    const audioElement = audioRef.current
    if (!audioElement) return
    
    const newTime = Math.min(audioElement.duration, audioElement.currentTime + 10)
    audioElement.currentTime = newTime
  }

  useEffect(() => {
    const audioElement = audioRef.current
    if (!audioElement) return
  
    const updateTime = () => setCurrentTime(audioElement.currentTime)
    const updateDuration = () => setDuration(audioElement.duration)
  
    audioElement.addEventListener('timeupdate', updateTime)
    audioElement.addEventListener('loadedmetadata', updateDuration)
  
    return () => {
      audioElement.removeEventListener('timeupdate', updateTime)
      audioElement.removeEventListener('loadedmetadata', updateDuration)
    }
  }, [])

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <button
          onClick={skipBackward}
          className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
          title="10초 뒤로"
        >
          ⏪ 10초
        </button>
        <button
        onClick={togglePlayback}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
        {isPlaying ? '⏹ pause' : '▶️ play'}
        </button>
        <button
            onClick={skipForward}
            className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
            title="10초 앞으로"
          >
            10초 ⏩
        </button>
        <button
          onClick={handleSpeedClick}
          className="px-3 py-1 border rounded text-sm"
          title="재생 속도 변경"
        >
          🔁 {speed.toFixed(2)}x
        </button>
        <audio
          ref={audioRef}
          onEnded={playNextAudio}
          preload="auto"
        />
        <div className="text-xs text-gray-500 mt-1">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
    )
  }