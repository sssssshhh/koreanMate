import type { Sentence, SentenceLayoutProps, WordDefinition } from "@/features/learning/chapters/types";
import { useState } from "react";

export default function SentenceLayout({ sentences }: SentenceLayoutProps) {
  const [hoveredDefinition, setHoveredDefinition] = useState<string | null>(null)
  const [selectedTranslationSentence, setSelectedTranslationSentence] = useState<String | null>(null)

  const onSentenceClick = (translation: String) => {
    setSelectedTranslationSentence(translation)
  }

  const onWordHover = (word: WordDefinition) => {
    setHoveredDefinition(word.definition)
  }
  
  const onWordLeave = () => setHoveredDefinition(null)
  
  const renderSentenceWithDefinitions = (sentence: Sentence) => {
    const text = sentence.original

    return text.split(/(\s+)/).map((word, idx) => {
      const cleanWord = word.replace(/[.,!?]/g, '')
      const wordDefinition = sentence.wordDefinitions?.find(m => m.word === cleanWord)

      return wordDefinition ? (
        <span
          key={idx}
          onMouseEnter={() => onWordHover(wordDefinition)}
          onMouseLeave={onWordLeave}
          className="hover:text-blue-600 cursor-pointer"
        >
          {word}
        </span>
      ) : (
        <span key={idx}>{word}</span>
      )
    })
  }

  return (
      <div className="border rounded-lg">
          <div className="h-24 border-t border-gray-200">
                <span className="text-sm text-gray-500 block mb-2">Sentence meaning</span>
                <p>{selectedTranslationSentence}</p>
            </div>
            <div className="h-24 border-t border-gray-200">
                <span className="text-sm text-gray-500 block mb-2">Word meaning</span>
                <p>{hoveredDefinition}</p>
            </div>
            <div className="border-t border-gray-200">
            {sentences.map((sentence) => (
              <div key={sentence.id}>
                <div className="p-4">
                  <p onClick={() => onSentenceClick(sentence.translations.en)} className="text-lg font-medium">
                    {renderSentenceWithDefinitions(sentence)}
                  </p>
                </div>
              </div>
            ))}
            </div>
      </div>
    )
}