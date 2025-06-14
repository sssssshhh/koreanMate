export type ChapterContent = {
  stories: StoryBlock[]
  quizzes: Quiz[]
  grammar: Grammar
  cultureNote: CultureNote
}

export type StoryBlock = {
  id: string
  sentences: Sentence[]
  recordingSentences?: recordingSentence[] // 선택적으로 녹음 대상 문장만 분리
}

export type Sentence = {
  id: string
  original: string
  audioUrl: string // 오디오 URL
  translations: Record<string, string> // ex: { en: '...', ja: '...' }
  wordMetadata?: WordMeta[]
}

export type recordingSentence = {
  id: string
  recordingSentence: string
}

export type WordMeta = {
  word: string
  definition: string
}

export type Audio = {
  id: number
  audio: string
}

export type Quiz = {
  id: string
  question: string
  answer: boolean
  explanation: string
}

export type Grammar = {
  title: string
  description: string
}

export type CultureNote = {
  title: string
  description: string
}
