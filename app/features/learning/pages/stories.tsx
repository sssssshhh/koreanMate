import { CompactButton } from "@/common/ui/compact-button";
import { Icon } from "@/common/ui/icon";
import { SearchInput } from "@/common/ui/search-input";
import { StoryCard } from "@/features/learning/components/story-card";
import { NavigationButtons } from "@/features/learning/components/navigation-buttons";
import { useState } from "react";
import storiesData from "@/features/learning/data/stories.json";

export default function Stories() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedButtons, setSelectedButtons] = useState<Set<string>>(new Set());
    const [currentPages, setCurrentPages] = useState<{ [key: string]: number }>({});

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

    // stories data from JSON
    const stories = storiesData;

    // filtered stories
    const getFilteredStories = (category: string) => {
        // filter stories by category
        const categoryStories = stories.filter(story => story.category === category);
        
        // when no filters are applied, only show stories in the selected category
        if (selectedButtons.size === 0) {
            return categoryStories;
        }
        
        // when filters are applied, only show stories that match the selected filters
        return categoryStories.filter(story => {
            return Array.from(selectedButtons).some(filter => {
                return story.level === filter || story.category === filter;
            });
        });
    };

    // bring only the stories in the current page (4 per page)
    const getCurrentPageStories = (category: string, allStories: any[]) => {
        const currentPage = currentPages[category] || 0;
        const startIndex = currentPage * 4;
        return allStories.slice(startIndex, startIndex + 4);
    };

    // change page function
    const changePage = (category: string, direction: 'next' | 'prev') => {
        const currentPage = currentPages[category] || 0;
        const allStories = getFilteredStories(category);
        const totalPages = Math.ceil(allStories.length / 4);
        
        if (direction === 'next' && currentPage < totalPages - 1) {
            setCurrentPages(prev => ({ ...prev, [category]: currentPage + 1 }));
        } else if (direction === 'prev' && currentPage > 0) {
            setCurrentPages(prev => ({ ...prev, [category]: currentPage - 1 }));
        }
    };

    // check if the navigation button is disabled
    const isNavigationDisabled = (category: string, direction: 'next' | 'prev') => {
        const allStories = getFilteredStories(category);
        const currentPage = currentPages[category] || 0;
        const totalPages = Math.ceil(allStories.length / 4);
        
        if (direction === 'next') {
            return currentPage >= totalPages - 1;
        } else {
            return currentPage <= 0;
        }
    };

    // section data
    const sections = [
        { title: "All stories", category: "All stories" },
        { title: "Dear diary", category: "Dear diary" },
        { title: "k-days", category: "k-days" },
        { title: "Seasonal stories", category: "Seasonal stories" }
    ];

    return (
        <div className="flex justify-center w-full">
            <div className="pt-20 flex flex-col">
                <div className="text-center justify-start text-stone-950 text-6xl font-bold font-['Merriweather'] tracking-wide">
                    Korean mate stories
                </div>
                <div className="h-28 pt-5 flex justify-center items-center gap-3">
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
                                    <span>All stories</span>
                                    <Icon name="check" className="ml-2" />
                                </CompactButton>
                                <CompactButton 
                                    variant="filter" 
                                    onClick={() => toggleButtonSelection("Dear diary")}
                                    className={isButtonSelected("Dear diary") ? "!bg-yellow-600 !text-white" : ""}
                                >
                                    <span>Dear diary</span>
                                    <Icon name="check" className="ml-2" />
                                </CompactButton>
                                <CompactButton 
                                    variant="filter" 
                                    onClick={() => toggleButtonSelection("k-days")}
                                    className={isButtonSelected("k-days") ? "!bg-yellow-600 !text-white" : ""}
                                >
                                    <span>k-days</span>
                                    <Icon name="check" className="ml-2" />
                                </CompactButton>
                                <CompactButton 
                                    variant="filter" 
                                    onClick={() => toggleButtonSelection("Seasonal stories")}
                                    className={isButtonSelected("Seasonal stories") ? "!bg-yellow-600 !text-white" : ""}
                                >
                                    <span>Seasonal stories</span>
                                    <Icon name="check" className="ml-2" />
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
                                    <span>Reading for Fun</span>
                                    <Icon name="check" className="ml-2" />
                                </CompactButton>
                                <CompactButton 
                                    variant="filter" 
                                    onClick={() => toggleButtonSelection("Living in Korea")}
                                    className={isButtonSelected("Living in Korea") ? "!bg-yellow-600 !text-white" : ""}
                                >
                                    <span>Living in Korea</span>
                                    <Icon name="check" className="ml-2" />
                                </CompactButton>
                                <CompactButton 
                                    variant="filter" 
                                    onClick={() => toggleButtonSelection("Studying in Korea")}
                                    className={isButtonSelected("Studying in Korea") ? "!bg-yellow-600 !text-white" : ""}
                                >
                                    <span>Studying in Korea</span>
                                    <Icon name="check" className="ml-2" />
                                </CompactButton>
                                <CompactButton 
                                    variant="filter" 
                                    onClick={() => toggleButtonSelection("First time in Korea")}
                                    className={isButtonSelected("First time in Korea") ? "!bg-yellow-600 !text-white" : ""}
                                >
                                    <span>First time in Korea</span>
                                    <Icon name="check" className="ml-2" />
                                </CompactButton>
                                <CompactButton 
                                    variant="filter" 
                                    onClick={() => toggleButtonSelection("I Love Korean Culture")}
                                    className={isButtonSelected("I Love Korean Culture") ? "!bg-yellow-600 !text-white" : ""}
                                >
                                    <span>I Love Korean Culture</span>
                                    <Icon name="check" className="ml-2" />
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
                                    <span>A1</span>
                                    <Icon name="check" className="ml-2" />
                                </CompactButton>
                                <CompactButton 
                                    variant="filter" 
                                    onClick={() => toggleButtonSelection("A2")}
                                    className={isButtonSelected("A2") ? "!bg-yellow-600 !text-white" : ""}
                                >
                                    <span>A2</span>
                                    <Icon name="check" className="ml-2" />
                                </CompactButton>
                                <CompactButton 
                                    variant="filter" 
                                    onClick={() => toggleButtonSelection("B1")}
                                    className={isButtonSelected("B1") ? "!bg-yellow-600 !text-white" : ""}
                                >
                                    <span>B1</span>
                                    <Icon name="check" className="ml-2" />
                                </CompactButton>
                            </div>
                        </div>
                    </div>
                )}
                {/* thumbnail area */}
                <div className="py-20 flex flex-col gap-20">
                    {sections.map((section, sectionIndex) => {
                        const filteredStories = getFilteredStories(section.category);
                        const currentPageStories = getCurrentPageStories(section.category, filteredStories);
                        const totalPages = Math.ceil(filteredStories.length / 4);
                        
                        return (
                            <div key={sectionIndex} className="w-full flex flex-col">
                                <div className="flex flex-row w-full justify-between">
                                    <div className="text-stone-950 text-3xl font-bold font-['Merriweather'] tracking-tight">
                                        {section.title}
                                    </div>
                                    <NavigationButtons
                                        category={section.category}
                                        onPageChange={changePage}
                                        isNavigationDisabled={isNavigationDisabled}
                                    />
                                </div>
                                
                                {/* Stories Grid with Slide Animation */}
                                {currentPageStories.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 transition-all duration-500 ease-in-out">
                                        {currentPageStories.map((story, index) => (
                                            <StoryCard
                                                key={`${sectionIndex}-${index}-${currentPages[section.category] || 0}`}
                                                id={story.id}
                                                imageUrl={story.imageUrl}
                                                title={story.title}
                                                level={story.level}
                                                category={story.category}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="mt-8 text-center text-gray-500 font-medium">
                                        No stories match the selected filters
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}