import type { Audio } from "@/features/content/types";

export default function AudioLayout({ audio }: { audio: Audio[] }) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <header>
          <h1>Audio!</h1>
        </header>
      </div>
    )
  }