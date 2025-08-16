import { PrimaryButton } from "@/common/ui/primary-button";
import { Input } from "@/common/ui/input";
import { useState } from "react";
import { resetPassword } from "aws-amplify/auth";
import { useNavigate, Link } from "react-router";
import AuthLayout from "@/features/auth/layouts/AuthLayout";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [generalError, setGeneralError] = useState("");
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        if (!email.trim()) {
            return "Email address is required.";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Please enter a valid email address.";
        }
        return "";
    };

    const handleSendCode = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEmailError("");
        setGeneralError("");
        
        // Validate email
        const emailValidation = validateEmail(email);
        if (emailValidation) {
            setEmailError(emailValidation);
            return;
        }

        setIsLoading(true);

        try {
          const result = await resetPassword({ username: email });
          console.log("✅ Reset password result:", result);
          navigate("/verification", { state: { email } });
        } catch (error: any) {
          console.error("❌ Reset password failed:", error);
          setGeneralError(error.message || "Failed to send reset email. Please try again.");
        } finally {
          setIsLoading(false);
        }
    }

    return (
      <AuthLayout
        title="Forgot your password?"
        subtitle="Enter your email address and we'll send you a reset link."
        iconSrc="/images/lock.svg"
        iconAlt="Forgot Password"
      >
        <div className="flex justify-center w-full">
          <form onSubmit={handleSendCode} className="space-y-4 w-10/12 max-w-md pt-14" noValidate>
            {generalError && (
              <div className="text-red-600 text-sm font-medium mb-4">
                {generalError}
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                required
              />
              {emailError && (
                <div className="text-red-600 text-sm font-medium mt-1">
                  {emailError}
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center items-center pt-10 gap-4">
              <PrimaryButton
                type="submit"
                disabled={isLoading}
                className="w-full"
                bgColor="#0057FF"
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </AuthLayout>
    );
}