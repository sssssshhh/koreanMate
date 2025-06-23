import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/common/components/ui/accordion"
import { useParams, Link } from "react-router"

export default function Chapters(){
    const { storyId } = useParams()

    return (
        <div>
            <Accordion       
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1">
                <AccordionItem value="item-1">
                    <AccordionTrigger>조용한 도서관에서의 아침 공부</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <Link
                        to={`/stories/${storyId}/chapter1`}
                        >
                            go to next page
                        </Link>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>민지와 함께하는 공부 </AccordionTrigger>
                    <Link
                        to={`/stories/${storyId}/chapter1`}
                        >
                            go to next page
                        </Link>
                </AccordionItem>
            </Accordion>
        </div>
    )
}