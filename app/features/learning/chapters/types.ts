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
  id: number;
  audio: string;
}