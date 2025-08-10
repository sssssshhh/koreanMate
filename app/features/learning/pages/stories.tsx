import { Icon } from "@/common/ui/icon";
import { IconInput } from "@/common/ui/icon-input";

export default function Stories() {
    return (
        <div className="flex justify-center w-full">
            <div className="pt-20 flex flex-col">
                <div className="text-center justify-start text-stone-950 text-6xl font-bold font-['Merriweather'] tracking-wide">
                    Korean mate stories
                </div>
                <div className="w-full h-11 pt-5 flex justify-center items-center">
                    {/* search bar with icon */}
                    <IconInput 
                        placeholder="Search here" 
                        icon="search"
                        iconPosition="right"
                    />
                    <div className="bg-white rounded-full p-2 shadow-sm w-10 h-10 flex items-center justify-center">
                        <Icon name="filter" />
                    </div>
                    <div className="bg-white rounded-full p-2 shadow-sm w-10 h-10 flex items-center justify-center">
                        <Icon name="calendar" />
                    </div>
                </div>
                <div>
                    {/* thumnbnai bar */}

                </div>
            </div>
        </div>
    )
}