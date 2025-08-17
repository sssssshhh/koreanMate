import { Link } from "react-router"
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { SmallButton } from "@/common/ui/small-button";
import { LargeButton } from "../ui/large-button";

export default function Navigation({isLoggedIn, isLoading}: {isLoggedIn: boolean; isLoading: boolean}){
    const { logout, user } = useAuth();
    
    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    // 로딩 중일 때 스켈레톤 UI 표시
    if (isLoading) {
        return (
            <nav>
                <div className="w-full h-20 flex flex-row justify-between items-center bg-white px-32">
                    {/* Logo - always visible */}
                    <Link to="/">
                        <img src="/images/logo.svg" alt="logo" className="w-36 h-8" />
                    </Link>
                    
                    {/* Desktop Navigation - hidden below 744px */}
                    <div className="hidden lg:flex flex-row items-center gap-28">
                        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    
                    {/* Desktop Buttons - 로딩 중 스켈레톤 */}
                    <div className="hidden lg:flex flex-row items-center gap-10">
                        <div className="w-20 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="w-24 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav>
            <div className="w-full h-20 flex flex-row justify-between items-center bg-white px-32">
                {/* Logo - always visible */}
                <Link to="/">
                    <img src="/images/logo.svg" alt="logo" className="w-36 h-8" />
                </Link>
                
                {/* Desktop Navigation - hidden below 744px */}
                <div className="hidden lg:flex flex-row items-center gap-28">
                    <Link to="/stories" className="text-black text-base font-merriweather hover:text-blue-600">Learn</Link>
                    <Link to="/" className="text-black text-base font-merriweather hover:text-blue-600">Give</Link>
                    <Link to="/" className="text-black text-base font-merriweather hover:text-blue-600">My page</Link>
                </div>
                
                {/* Desktop Buttons - hidden below 744px */}
                <div className="hidden lg:flex flex-row items-center gap-10">
                    {isLoggedIn ? (
                        // logged in: show logout button
                        <div className="flex items-center gap-4">
                            {(() => {
                                // console.log로 사용자 정보 출력
                                console.log("🔑 User Info:", {
                                    sub: user?.sub,
                                    email: user?.email,
                                    name: user?.name,
                                    fullUser: user
                                });
                                return null;
                            })()}
                            <SmallButton
                                variant="red"
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-500 text-white font-merriweather"
                            >
                                Logout
                            </SmallButton>
                        </div>
                    ) : (
                        // 비로그인 상태: 로그인/회원가입 버튼
                        <>
                            <Link to="/login">
                                <SmallButton className="bg-blue-600 hover:bg-blue-500 text-white font-merriweather">Log in</SmallButton>
                            </Link>
                            <Link to="/register">
                                <SmallButton className="bg-orange-600 hover:bg-orange-500 text-white border border-orange-600 font-merriweather">Join us!</SmallButton>
                            </Link>
                        </>
                    )}
                </div>
                
                {/* Mobile Menu Button - visible below 744px */}
                <div className="lg:hidden relative group">
                    <img src="/images/grid.svg" alt="menu" className="w-6 h-6 cursor-pointer" />
                    
                    {/* Fullscreen Hover Menu */}
                    <div className="fixed inset-x-0 top-20 bottom-30 bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        <div className="pt-10 flex flex-col items-center justify-center h-full">
                            {/* Menu Items */}
                            <div className="flex flex-col items-center gap-10">
                                {/* Navigation Links */}
                                <Link 
                                    to="/stories" 
                                    className="text-3xl font-bold font-merriweather text-stone-950 hover:text-blue-600 transition-colors"
                                    onClick={() => {
                                        // Force hide the menu by removing hover state
                                        const event = new MouseEvent('mouseleave', { bubbles: true });
                                        document.dispatchEvent(event);
                                    }}
                                >
                                    Learn
                                </Link>
                                <Link 
                                    to="/" 
                                    className="text-3xl font-bold font-merriweather text-stone-950 hover:text-blue-600 transition-colors"
                                    onClick={() => {
                                        const event = new MouseEvent('mouseleave', { bubbles: true });
                                        document.dispatchEvent(event);
                                    }}
                                >
                                    Give
                                </Link>
                                <Link 
                                    to="/" 
                                    className="text-3xl font-bold font-merriweather text-stone-950 hover:text-blue-600 transition-colors"
                                    onClick={() => {
                                        const event = new MouseEvent('mouseleave', { bubbles: true });
                                        document.dispatchEvent(event);
                                    }}
                                >
                                    My page
                                </Link>

                                {/* Action Buttons */}
                                <div className="pt-24 flex flex-col items-center gap-10">
                                    {isLoggedIn ? (
                                        // logged in: show logout button
                                        <>
                                            <LargeButton 
                                                variant="orange" 
                                                className="w-60 h-10"
                                                onClick={() => {
                                                    handleLogout();
                                                    const event = new MouseEvent('mouseleave', { bubbles: true });
                                                    document.dispatchEvent(event);
                                                }}
                                            >
                                                Logout
                                            </LargeButton>
                                        </>
                                    ) : (
                                        // not logged in: show login/register buttons
                                        <>
                                            <Link to="/login">
                                                <LargeButton 
                                                    variant="blue" 
                                                    className="w-60 h-10"
                                                    onClick={() => {
                                                        const event = new MouseEvent('mouseleave', { bubbles: true });
                                                        document.dispatchEvent(event);
                                                    }}
                                                >
                                                    Log in
                                                </LargeButton>
                                            </Link>
                                            <Link to="/register">
                                                <LargeButton 
                                                    variant="orange" 
                                                    className="w-60 h-9"
                                                    onClick={() => {
                                                        const event = new MouseEvent('mouseleave', { bubbles: true });
                                                        document.dispatchEvent(event);
                                                    }}
                                                >
                                                    Join us!
                                                </LargeButton>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}