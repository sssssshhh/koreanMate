import { Link } from "react-router"
import { useAuth } from "@/features/auth/contexts/AuthContext";
import { SmallButton } from "@/common/ui/small-button";

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
            <div className="w-full h-20 flex flex-row justify-between items-center bg-white px-32">
                    <img src="/images/logo.svg" alt="logo" className="w-36 h-8" />
                    <div className="flex flex-row items-center gap-28">
                        <Link to="/stories" className="text-black text-base font-merriweather hover:text-blue-600">Learn</Link>
                        <Link to="/" className="text-black text-base font-merriweather hover:text-blue-600">Give</Link>
                        <Link to="/" className="text-black text-base font-merriweather hover:text-blue-600">My page</Link>
                    </div>
                    <div className="flex flex-row items-center gap-10">
                        <Link to="/login">
                            <SmallButton className="bg-blue-600 hover:bg-blue-500 text-white font-merriweather">Log in</SmallButton>
                        </Link>
                        <Link to="/register">
                            <SmallButton className="bg-orange-600 hover:bg-orange-500 text-white border border-orange-600 font-merriweather">Join us!</SmallButton>
                        </Link>
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