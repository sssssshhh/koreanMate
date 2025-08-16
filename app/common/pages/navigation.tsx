import { Link, useNavigate } from "react-router"
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { BaseButton } from "@/common/ui/base-button";

export default function Navigation({isLoggedIn, isLoading}: {isLoggedIn: boolean; isLoading: boolean}){
    const { logout } = useAuth();
    
    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <nav>
            {/* TODO check:self-stretch data-property data-show-icon*/}
            <div className="self-stretch flex flex-col justify-start items-start">
                <div className="self-stretch flex flex-col justify-start items-start">
                    <div className="self-stretch px-28 py-2.5 bg-white inline-flex justify-start items-center gap-10">
                        <div className="flex-1 flex justify-between items-center">
                            <div className="pt-2.5 flex justify-center items-center gap-2.5">
                                <div className="justify-start text-blue-600 text-2xl font-black">
                                    <Link to="/">
                                        Korean Mate
                                    </Link>
                                </div>
                            </div>
                            <div className="pt-3.5 flex justify-start items-end gap-28 text-black text-base font-bold tracking-tight">
                                <Link to="/stories">Learn</Link>
                                <Link to="/">Give</Link>
                                <Link to="/">My page</Link>
                            </div>
                            {isLoggedIn ? 
                                <div className="pt-3.5 flex justify-start items-center gap-2.5">
                                    <div data-property-1="blue" data-property-2="default" data-show-icon="false" className="px-5 py-2.5 bg-blue-600 rounded-full flex justify-center items-center gap-2.5">
                                        <div className="justify-start text-white text-base font-bold tracking-tight">Log our</div>
                                    </div>
                                </div>
                                    :
                                <div className="pt-3.5 flex justify-start items-center gap-2.5">
                                    <div data-property-1="blue" data-property-2="default" data-show-icon="false" className="px-5 py-2.5 bg-blue-600 rounded-full flex justify-center items-center gap-2.5">
                                        <Link to="/login" className="justify-start text-white text-base font-bold tracking-tight">Log in</Link>
                                    </div>
                                    <div data-property-1="orange" data-property-2="default" data-show-icon="false" className="px-5 py-2.5 bg-orange-600 rounded-full flex justify-center items-center gap-2.5">
                                        <Link to="/register" className="text-white text-base font-bold tracking-tight">Join us!</Link>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    {/* TODO:이게 왜 필요하지? */}
                    <div className="self-stretch h-7 bg-white"></div>
                </div>
            </div>


            {/* {isLoading ? (
                <div className="flex items-center gap-6">
                    <span className="text-sm text-gray-500">Loading...</span>
                </div>
            ) : isLoggedIn ? (
                <div className="flex items-center gap-6">
                    <Button asChild variant="secondary" onClick={handleLogout}>
                        <span>Logout</span>
                    </Button>
                </div>
            ) : (
                <div className="flex items-center gap-6">
                    <Button asChild variant="secondary">
                        <Link to="/login">Login</Link>
                    </Button>
                    <Button asChild variant="secondary">
                        <Link to="/register">Register</Link>
                    </Button>
                </div>
            )} */}
        </nav>
    )
}