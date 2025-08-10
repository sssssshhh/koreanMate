import { CompactButton } from "@/common/ui/compact-button";
import { Icon } from "@/common/ui/icon";
import { SearchInput } from "@/common/ui/search-input";
import { useState } from "react";

export default function Stories() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedButtons, setSelectedButtons] = useState<Set<string>>(new Set());

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const toggleButtonSelection = (buttonText: string) => {
        setSelectedButtons(prev => {
            const newSet = new Set(prev);
            if (newSet.has(buttonText)) {
                newSet.delete(buttonText);
            } else {
                newSet.add(buttonText);
            }
            return newSet;
        });
    };

    const isButtonSelected = (buttonText: string) => selectedButtons.has(buttonText);

    return (
        <div className="flex justify-center w-full">
            <div className="pt-20 flex flex-col">
                <div className="text-center justify-start text-stone-950 text-6xl font-bold font-['Merriweather'] tracking-wide">
                    Korean mate stories
                </div>
                <div className="w-full h-28 pt-5 flex justify-center items-center gap-3">
                    <SearchInput
                        placeholder="Search here"
                        icon="search"
                        iconPosition="right"
                    />
                    <button
                        onClick={toggleFilter}
                        className="bg-white rounded-full p-2 shadow-sm w-12 h-10 flex items-center justify-center outline outline-amber-200 hover:outline-amber-300 transition-colors"
                    >
                        <Icon name="filter" />
                    </button>
                </div>
                {isFilterOpen && (
                    <div className="px-10 py-8 bg-white rounded-3xl flex flex-col justify-start items-start gap-4">
                        <div className="flex flex-row">
                            <div className="w-28 pr-8 pt-2 justify-start text-stone-950 text-lg font-medium font-['Pretendard'] leading-relaxed tracking-tight">Topics</div>
                            <div className="flex flex-row gap-4">
                                <CompactButton 
                                    variant="filter" 
                                    onClick={() => toggleButtonSelection("All stories")}
                                    className={isButtonSelected("All stories") ? "!bg-yellow-600 !text-white" : ""}
                                >
                                    All stories
                                </CompactButton>
                                <CompactButton 
                                    variant="filter" 
                                    onClick={() => toggleButtonSelection("Dear diary")}
                                    className={isButtonSelected("Dear diary") ? "!bg-yellow-600 !text-white" : ""}
                                >
                                    Dear diary
                                </CompactButton>
                                <CompactButton 
                                    variant="filter" 
                                    onClick={() => toggleButtonSelection("k-days")}
                                    className={isButtonSelected("k-days") ? "!bg-yellow-600 !text-white" : ""}
                                >
                                    k-days
                                </CompactButton>
                                <CompactButton 
                                    variant="filter" 
                                    onClick={() => toggleButtonSelection("Seasonal stories")}
                                    className={isButtonSelected("Seasonal stories") ? "!bg-yellow-600 !text-white" : ""}
                                >
                                    Seasonal stories
                                </CompactButton>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="w-28 pr-8 justify-start text-stone-950 text-lg font-medium font-['Pretendard'] leading-relaxed tracking-tight">Categories</div>
                            <div className="flex flex-row gap-5">
                                <CompactButton 
                                    variant="filter" 
                                    onClick={() => toggleButtonSelection("Reading for Fun")}
                                    className={isButtonSelected("Reading for Fun") ? "!bg-yellow-600 !text-white" : ""}
                                >
                                    Reading for Fun
                                </CompactButton>
                                <CompactButton 
                                    variant="filter" 
                                    onClick={() => toggleButtonSelection("Living in Korea")}
                                    className={isButtonSelected("Living in Korea") ? "!bg-yellow-600 !text-white" : ""}
                                >
                                    Living in Korea
                                </CompactButton>
                                <CompactButton 
                                    variant="filter" 
                                    onClick={() => toggleButtonSelection("Studying in Korea")}
                                    className={isButtonSelected("Studying in Korea") ? "!bg-yellow-600 !text-white" : ""}
                                >
                                    Studying in Korea
                                </CompactButton>
                                <CompactButton 
                                    variant="filter" 
                                    onClick={() => toggleButtonSelection("First time in Korea")}
                                    className={isButtonSelected("First time in Korea") ? "!bg-yellow-600 !text-white" : ""}
                                >
                                    First time in Korea
                                </CompactButton>
                                <CompactButton 
                                    variant="filter" 
                                    onClick={() => toggleButtonSelection("I Love Korean Culture")}
                                    className={isButtonSelected("I Love Korean Culture") ? "!bg-yellow-600 !text-white" : ""}
                                >
                                    I Love Korean Culture
                                </CompactButton>
                            </div>                        
                        </div>
                        <div className="flex flex-row">
                            <div className="w-28 pr-8 justify-start text-stone-950 text-lg font-medium font-['Pretendard'] leading-relaxed tracking-tight">All levels</div>
                            <div className="flex flex-row gap-3">
                                <CompactButton 
                                    variant="filter" 
                                    onClick={() => toggleButtonSelection("A1")}
                                    className={isButtonSelected("A1") ? "!bg-yellow-600 !text-white" : ""}
                                >
                                    A1
                                </CompactButton>
                                <CompactButton 
                                    variant="filter" 
                                    onClick={() => toggleButtonSelection("A2")}
                                    className={isButtonSelected("A2") ? "!bg-yellow-600 !text-white" : ""}
                                >
                                    A2
                                </CompactButton>
                                <CompactButton 
                                    variant="filter" 
                                    onClick={() => toggleButtonSelection("B1")}
                                    className={isButtonSelected("B1") ? "!bg-yellow-600 !text-white" : ""}
                                >
                                    B1
                                </CompactButton>
                            </div>
                        </div>
                    </div>
                )}
                <div>
                    {/* thumnbnai bar */}
                </div>
            </div>
        </div>
    )
}