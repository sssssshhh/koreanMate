import { fetchAuthSession, signIn } from "aws-amplify/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { PrimaryButton } from "@/common/ui/primary-button";
import { Input } from "@/common/ui/input";
import { useAuth } from "@/features/auth/contexts/AuthContext";
import AuthLayout from "@/features/auth/layouts/AuthLayout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      await signIn({ username: email, password });

      const session = await fetchAuthSession();
      const idToken = session.tokens?.idToken?.toString();
      const accessToken = session.tokens?.accessToken?.toString();
  
      if (accessToken) localStorage.setItem("access_token", accessToken);
      if (idToken) localStorage.setItem("id_token", idToken);

      // Update global auth state
      login();
      
      navigate('/');  
    
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Good to see you again!"
      subtitle="Sign in to continue your Korean learning journey."
      iconSrc="/images/welcome_back.svg"
      iconAlt="Login"
    >
      <div className="flex justify-center w-full">
        <form onSubmit={handleSubmit} className="space-y-4 w-10/12 max-w-md pt-14" noValidate>
          {errorMessage && (
            <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-800">
              {errorMessage}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="text-neutral-400 text-base font-pretendardormal font-['Lato']">
              Email address <span className="text-red-500 ml-1">*</span>
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-neutral-400 text-base font-pretendardormal font-['Lato']">
              Password <span className="text-red-500 ml-1">*</span>
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-center">
            <Link to="/forgot-password" className="hover:text-blue-500 text-sm underline underline-offset-1">
                Forgot your password?
            </Link>
          </div>

          <div className="flex flex-col justify-center items-center pt-10 gap-4">
            <PrimaryButton
              type="submit"
              disabled={isLoading}
              className="w-full"
              bgColor="#0057FF"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </PrimaryButton>

            <PrimaryButton
              type="button"
              disabled={isLoading}
              className="w-full"
              bgColor="#FFFFFF"
              textColor="#000000"
              onClick={() => {
                if (!import.meta.env.VITE_CLIENT_ID) {
                  throw new Error('VITE_CLIENT_ID environment variable is required');
                }
                if (!import.meta.env.VITE_REDIRECT_URI) {
                  throw new Error('VITE_REDIRECT_URI environment variable is required');
                }
                if (!import.meta.env.VITE_COGNITO_DOMAIN) {
                  throw new Error('VITE_COGNITO_DOMAIN environment variable is required');
                }
                window.location.href = 
                `https://${import.meta.env.VITE_COGNITO_DOMAIN}.auth.us-east-1.amazoncognito.com/oauth2/authorize?identity_provider=Google&response_type=code&client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}`;
              }}
            >
              <img 
                src="/images/google.svg" 
                alt="Google" 
                className="w-4 h-4"
              />
              Sign in with Google
            </PrimaryButton>
          </div>

          <div className="text-center pt-10 space-y-2">
            <div className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:text-blue-500">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}