import { fetchAuthSession, signIn } from "aws-amplify/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/common/components/ui/button";
import { useAuth } from "@/features/auth/contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
    
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit">login</Button>
      </form>
      <Button onClick={() => {
        navigate('/forgot-password');
      }}>
        forgot password
      </Button>
      <Button>
        <Link to={`/Register`}>
            register
        </Link>
      </Button>

      <div className="mt-4">
        <Button
          type="button"
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

          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}