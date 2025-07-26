import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { signUp } from 'aws-amplify/auth';
import { Button } from "@/common/components/ui/button";
import { validateForm, type SignUpData } from "@/features/auth/utils/validation";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignUpData>({
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateForm(formData, confirmPassword);
    if (!validation.isValid) {
      setMessage({ type: "error", text: validation.message });
      return;
    }

    setIsLoading(true);

    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
          },
        },
      });
      navigate('/login');
    } catch (error: any) {
      console.error("Sign Up Error:", error);
      console.error("Error Details:", {
        name: error.name,
        message: error.message,
        code: error.code
      });
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Sign Up</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {message && (
            <div className={`p-3 rounded-md ${
              message.type === "error" 
                ? "bg-red-50 border border-red-200 text-red-800" 
                : "bg-green-50 border border-green-200 text-green-800"
            }`}>
              {message.text}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="example@email.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="8 characters or more, include uppercase and lowercase letters, numbers, and special characters"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="confirm password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "Sign Up"}
          </Button>

          <div className="mt-4">
            <Button
              type="button"
              onClick={() => {
                window.location.href = 
                "https://us-east-1qplni92vm.auth.us-east-1.amazoncognito.com/oauth2/authorize?identity_provider=Google&response_type=code&client_id=1185ddfcdmpk9hcd502j504lna&redirect_uri=http://localhost:5173/";
              }}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
            >
              Sign in with Google
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-500">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}