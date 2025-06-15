import type { Audio } from "@/features/content/types";
import { useRef, useState } from "react";

export default function AudioLayout({ audios }: { audios: Audio[] }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1.0)

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

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <button
        onClick={togglePlayback}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
      >
        {isPlaying ? '⏹ pause' : '▶️ play'}
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
      </div>
    )
  }