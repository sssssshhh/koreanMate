export type ChapterContent = {
  stories: StoryBlock[]
  quizzes?: Quiz[]
  grammar?: Grammar
  cultureNote?: CultureNote
}

export type StoryBlock = {
  id: string
  sentences: Sentence[]
  recordingSentences?: recordingSentence[]
  quizes?: Quiz[]
  audios?: Audio[]
  grammar?: Grammar
  cultureNote?: CultureNote
}

export type Sentence = {
  id: string
  original: string
  audioUrl: string
  translations: Record<string, string>
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
  level: string
  words: string[]
  answer: string[]  
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
