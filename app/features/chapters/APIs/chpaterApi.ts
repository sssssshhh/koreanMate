import type { Chapter } from '../types'

export async function getChaptersByStoryId(storyId: string): Promise<Chapter[]> {
  const res = await fetch(`/api/stories/${storyId}/chapters`)
  if (!res.ok) throw new Error('Failed to fetch chapters')
  return res.json()
}