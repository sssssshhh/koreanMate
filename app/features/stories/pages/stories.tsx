import { useEffect, useState } from 'react'
import type { Story } from '../types'
import { getStories } from '../services/storyApi'

export default function Stories(){
    const [stories, setStories] = useState<Story[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStories = async () => {
          try {
            const data = await getStories()
            setStories(data)
          } catch (error) {
            console.error('Failed to load stories:', error)
          } finally {
            setLoading(false)
          }
        }
    
        fetchStories()
      }, [])

    return (
        <div>
            <h1>Stories</h1>
        </div>
    )
}