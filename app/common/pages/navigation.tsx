import { Link } from "react-router"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
  } from "~/common/components/ui/navigation-menu"
  import { Button } from "~/common/components/ui/button";

export default function Navigation({isLoggedIn}: {isLoggedIn: boolean}){

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
                {isLoggedIn ? null : (
                    <div className="flex items-center gap-4">
                        <Button asChild variant="secondary">
                            <Link to="/login">Login</Link>
                        </Button>
                        <Button asChild variant="secondary">
                            <Link to="/register">Register</Link>
                        </Button>
                </div>)}
            </div>
      </nav>
    )
}