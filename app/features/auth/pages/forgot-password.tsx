import { Button } from "@/common/components/ui/button";
import { useState } from "react";
import { resetPassword, confirmResetPassword } from "aws-amplify/auth";
import { useNavigate } from "react-router";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('forgot password');

        try {
          const result = await resetPassword({ username: email });
          console.log("✅ Auth result:", result);
          navigate("/reset-password", { state: { email } });
        } catch (error) {
          console.error("❌ Auth Failed:", error);
        }
    }
    
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button type="submit">forgot password</Button>
        </form>
      </div>
    );
  }