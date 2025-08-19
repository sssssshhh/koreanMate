export type Chapter = {
    id: string
    title: string
    order: number
  }

  export type Sentence = {
    id: string;
    original: string;
    pronunciation: string;
    meaningUnit: string;
    translations: {
        en: string;
    };
    wordDefinitions: WordDefinition[];
}

export type WordDefinition = {
    word: string;
    definition: string;
}

export type SentenceLayoutProps = {
  sentences: Sentence[];
}

export type Audio = {
  id: string;
  title: string;
  audio: string; // audio file URL or path
  duration?: number; // duration in seconds
  transcript?: string; // optional transcript text
  chapterId?: string; // optional chapter ID for grouping
  order?: number; // optional order for sequencing
}