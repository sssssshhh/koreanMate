import { useEffect, useRef, useState } from "react";
import type { Audio } from "@/features/learning/chapters/types";

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
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-32 py-4 flex flex-row justify-between">
        <div className="flex flex-row items-center gap-2">
          <span className="text-sm font-lato text-neutral-400">Speed</span>
          <button
            onClick={handleSpeedClick}
            className="p-2.5 rounded-full outline outline-offset-[-1px] outline-zinc-300 hover:outline-zinc-400 transition-colors cursor-pointer"
            title="Speed"
          >
            <span className="text-sm font-lato text-neutral-400">{speed.toFixed(2)}x</span>
          </button>
        </div>
        <button
        onClick={togglePlayback}
        className="hover:cursor-pointer"
        >
        {isPlaying ? (
          <img src="/images/pause.svg" alt="pause" className="w-9 h-9" />
        ) : (
          <img src="/images/play.svg" alt="play" className="w-9 h-9" />

        )}
        </button>


        <audio
          ref={audioRef}
          onEnded={playNextAudio}
          preload="auto"
        />
        <div></div>
      </div>
    )
  }