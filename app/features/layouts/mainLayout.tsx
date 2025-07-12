import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card"
import { Link } from "react-router"

export default function MainLayout() {
  
  return (
    <div className="h-full w-full flex flex-row justify-center items-center gap-2">
      <Link
      to="/stories/story1"
      className="text-black"
      >
        <Card className="w-[400px] transition-transform duration-200 hover:scale-105">
          <CardHeader>
            <img src="https://placehold.co/400x400" alt="level" className="w-full h-full object-cover" />
          </CardHeader>
          <CardContent>
            <div className="text-md">Dear Diary</div>
          </CardContent>
        </Card>
      </Link>
      <Link
      to="/stories/story1"
      className="text-black"
      >
        <Card className="w-[400px] transition-transform duration-200 hover:scale-105">
          <CardHeader>
            <img src="https://placehold.co/400x400" alt="level" className="w-full h-full object-cover" />
          </CardHeader>
          <CardContent>
            <div className="text-md">K-Days</div>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
  }