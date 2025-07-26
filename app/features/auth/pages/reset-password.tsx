import { Button } from "@/common/components/ui/button";
import { confirmResetPassword } from "aws-amplify/auth";
import { useState } from "react"; 
import { useLocation, useNavigate } from "react-router";
import { validateForm } from "../utils/validation";

export default function ResetPassword() {
    const { email } = useLocation().state;
    const navigate = useNavigate();
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        // Validate password using the validation utility
        const validation = validateForm({ email, password }, confirmPassword);
        if (!validation.isValid) {
            setError(validation.message);
            return;
        }

        try {
            const result = await confirmResetPassword({ username: email, confirmationCode: code, newPassword: password });
        } catch (error) {
            console.error("❌ Auth Failed:", error);
            setError("Failed to reset password. Please check your code and try again.");
        } finally {
            navigate("/login");
        }
    } 
  return (
      <div className="container mx-auto px-4 py-8 text-black">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="code" placeholder="code" value={code} onChange={(e) => setCode(e.target.value)} />
          <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <input type="password" placeholder="confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit">reset password</Button>
        </form>
      </div>
    );
  }