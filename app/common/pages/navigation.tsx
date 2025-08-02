import { Link } from "react-router"
import {
    NavigationMenu,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from "@/common/components/ui/navigation-menu"
import { Button } from "@/common/components/ui/button";
import { useAuth } from "@/features/auth/contexts/AuthContext";

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
        <nav className="flex px-20 h-16 items-center justify-between fixed top-0 left-0 right-0 z-50">
            <div className="flex items-center">
                <Link to="/" className="font-bold tracking-tighter text-lg">
                KoreanMate
                </Link>
                <NavigationMenu className="px-20">
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link to="/">Stories</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link to="/blog">Blog</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link to="/grammer">Grammer</Link>
                    </NavigationMenuLink>
                </NavigationMenu>
                {isLoading ? (
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
                )}
            </div>
        </nav>
    )
}