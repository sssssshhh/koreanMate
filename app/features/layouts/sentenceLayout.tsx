import type { Sentence, SentenceLayoutProps } from "@/features/chapters/types";

export default function SentenceLayout({ sentences }: SentenceLayoutProps) {
    return (
        <div className="border rounded-lg">
            <div className="h-24 border-t border-gray-200">
                  <span className="text-sm text-gray-500 block mb-2">Sentence meaning</span>
              </div>
              <div className="h-24 border-t border-gray-200">
                  <span className="text-sm text-gray-500 block mb-2">Word meaning</span>
              </div>
              <div className="border-t border-gray-200">
              {sentences.map((sentence) => (
                <div key={sentence.id}>
                  <div className="p-4">
                    <p className="font-medium">{sentence.original}</p>
                    <p className="text-gray-600">{sentence.translations.en}</p>
                  </div>
                </div>
              ))}
              </div>
        </div>
    )
}