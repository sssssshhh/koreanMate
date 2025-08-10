import { Link } from "react-router";

interface StoryCardProps {
    id: string;
    imageUrl: string;
    title: string;
    level: string;
    category: string;
}

export function StoryCard({ id, imageUrl, title, level, category }: StoryCardProps) {
    return (
        <Link 
            to={`/stories/${id}/chapters`}
            className="flex flex-col gap-4 hover:opacity-80 transition-opacity cursor-pointer"
        >
            <div className="w-full h-48 rounded-lg overflow-hidden">
                <img 
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>
            <div className="text-stone-950 text-lg font-medium font-['Pretendard'] leading-relaxed">
                {title}
            </div>
            <div className="flex gap-2">
                <span className="px-3 py-1 bg-amber-100 text-amber-800 text-sm font-medium rounded-full">
                    {level}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {category}
                </span>
            </div>
        </Link>
    );
} 