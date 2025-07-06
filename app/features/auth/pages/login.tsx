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
      <Button>
        <Link to={`/Register`}>
            register
        </Link>
      </Button>
    </div>
  );
}