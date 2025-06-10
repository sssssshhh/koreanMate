import type { Content } from '../types'

export async function getContentsByChapterId(chapterId: string): Promise<Content[]> {
  const res = await fetch(`/api/chapters/${chapterId}/contents`)
  if (!res.ok) throw new Error('Failed to fetch contents')
  return res.json()
}