import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card"

export default function MainLayout() {
    return (
      <div className="flex flex-row justify-center items-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <img src="https://placehold.co/400x400" alt="level" className="w-full h-full object-cover" />
          </CardHeader>
          <CardContent>
            <CardTitle>어서 오세요</CardTitle>
          </CardContent>
        </Card>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <img src="https://placehold.co/400x400" alt="level" className="w-full h-full object-cover" />
          </CardHeader>
          <CardContent>
            <CardTitle>어서 오세요</CardTitle>
          </CardContent>
        </Card>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <img src="https://placehold.co/400x400" alt="level" className="w-full h-full object-cover" />
          </CardHeader>
          <CardContent>
            <CardTitle>어서 오세요</CardTitle>
          </CardContent>
        </Card>
      </div>
    )
  }