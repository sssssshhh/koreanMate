import { Link } from "react-router"

export default function GuestLayout() {
    return (
      <div className="guest-layout">
        <header>
          <h1>어서 오세요!</h1>
        </header>
        <Link
          to="/stories/story1"
          className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
        go to Chapters
      </Link>
      </div>
    )
  }