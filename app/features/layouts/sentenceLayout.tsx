import type { Sentence, SentenceLayoutProps } from "@/features/chapters/types";
import { useState } from "react";

export default function SentenceLayout({ sentences }: SentenceLayoutProps) {
  const [selectedTranslationSentence, setSelectedTranslationSentence] = useState<String | null>(null)
  
  const onSentenceClick = (translation: String) => {
    setSelectedTranslationSentence(translation)
  }

  return (
        <div className="border rounded-lg">
            <div className="h-24 border-t border-gray-200">
                  <span className="text-sm text-gray-500 block mb-2">Sentence meaning</span>
                  <p>{selectedTranslationSentence}</p>
              </div>
              <div className="h-24 border-t border-gray-200">
                  <span className="text-sm text-gray-500 block mb-2">Word meaning</span>
              </div>
              <div className="border-t border-gray-200">
              {sentences.map((sentence) => (
                <div key={sentence.id}>
                  <div className="p-4">
                    <p onClick={() => onSentenceClick(sentence.translations.en)} className="text-lg font-medium hover:text-blue-500 cursor-pointer">
                      {sentence.original}
                    </p>
                  </div>
                </div>
              ))}
              </div>
        </div>
    )
}