import type { Quiz } from "@/features/content/types";

export default function QuizLayout({ quizes }: { quizes: Quiz[] }) {
    return (
      <div className="guest-layout">
        <header>
          <h1>quiz!</h1>
        </header>
      </div>
    )
  }