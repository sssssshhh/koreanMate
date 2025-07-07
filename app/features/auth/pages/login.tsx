import { fetchAuthSession, signIn } from "aws-amplify/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/common/components/ui/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email, password);
    try {
      await signIn({ username: email, password });

      const session = await fetchAuthSession();
      const idToken = session.tokens?.idToken?.toString();
      const accessToken = session.tokens?.accessToken?.toString();
  
      console.log("idToken:", idToken);
      console.log("accessToken:", accessToken);
  
      if (accessToken) localStorage.setItem("access_token", accessToken);
      if (idToken) localStorage.setItem("id_token", idToken);

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
            window.location.href = "https://ap-northeast-1yqlvcbctk.auth.ap-northeast-1.amazoncognito.com/oauth2/authorize?identity_provider=Google&response_type=code&client_id=4fq95s8bn126sm56e769tunmk6&redirect_uri=http://localhost:5173/";
          }}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}