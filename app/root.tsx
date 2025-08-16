import React from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { fetchAuthSession } from "aws-amplify/auth";

import type { Route } from "./+types/root";
import "./app.css";
import Navigation from "./common/pages/navigation";
import { configureAmplify } from "./lib/amplify-config";
import { AuthProvider, useAuth } from "./features/auth/contexts/AuthContext";
import Footer from "./common/pages/footer";
import { MediumButton } from "./common/ui/medium-button";
import { Link } from "react-router"
// init Amplify 
configureAmplify();

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/font-pretendardwesome/6.5.1/css/all.min.css",
  },
];

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isLoading } = useAuth();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navigation isLoggedIn={isLoggedIn} isLoading={isLoading} />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <LayoutContent>{children}</LayoutContent>
    </AuthProvider>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  console.log("🔴 Error:", error);

  return (
    <div className="min-h-screen bg-gray-900/80 flex items-center justify-center p-4">
      <div className="w-[418px] h-[394px] bg-white rounded-lg p-9 flex flex-col items-center justify-center text-center">
        <img src="/images/404.gif" alt="Error" className="w-20 h-20 mb-6" />
        <div className="justify-start text-stone-950 text-3xl font-pretendardormal font-merriweather tracking-tight">"Oops! Something went wrong."</div>
        <div className="pt-5 pb-10 w-80 justify-start text-neutral-400 text-base font-medium font-['Lato'] tracking-tight">We're having trouble loading your content.
        Please try again later, or return to the home page.
        </div>
        <MediumButton>
          <Link to="/">
            <span className="text-white">Go to Home</span>
          </Link>
        </MediumButton>
      </div>
    </div>
  );
}
