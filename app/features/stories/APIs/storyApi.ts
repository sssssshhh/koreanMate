import type { Story } from "../types"

const API = '/api/stories'

export async function getStories(): Promise<Story[]> {
    const res = await fetch(API)
    if (!res.ok) throw new Error('Failed to fetch stories')
    return res.json()
  }

  export async function getStoryById(storyId: string): Promise<Story> {
    const res = await fetch(`${API}/${storyId}`)
    if (!res.ok) throw new Error('Failed to fetch story')
    return res.json()
  }