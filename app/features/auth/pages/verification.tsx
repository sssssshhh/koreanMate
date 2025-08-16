import { MediumButton } from "@/common/ui/medium-button";
import { Input } from "@/common/ui/input";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import AuthLayout from "@/features/auth/layouts/AuthLayout";

export default function Verification() {
    const [verificationCode, setVerificationCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [codeError, setCodeError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    
    // Get email from previous page
    const email = location.state?.email;
    
    // If no email in state, redirect to forgot-password
    if (!email) {
        navigate("/forgot-password");
        return null;
    }

    const validateCode = (code: string) => {
        if (!code.trim()) {
            return "Verification code is required.";
        }
        if (code.length < 6) {
            return "Verification code must be at least 6 characters.";
        }
        return "";
    };

    const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCodeError("");
        
        // Validate verification code
        const codeValidation = validateCode(verificationCode);
        if (codeValidation) {
            setCodeError(codeValidation);
            return;
        }

        setIsLoading(true);

        // Navigate to reset-password with email and verification code
        navigate("/reset-password", { 
            state: { 
                email, 
                verificationCode 
            } 
        });
        
        setIsLoading(false);
    }

    return (
      <AuthLayout
        title="Verification code"
        subtitle={
          <>
            We've sent a verification code to your email.<br />
            Please enter it below to verify your identity.
          </>
        }
        iconSrc="/images/verification_code.svg"
        iconAlt="Verification code"
      >
        <div className="flex justify-center w-full">
          <form onSubmit={handleVerify} className="space-y-4 w-10/12 max-w-md pt-14" noValidate>
            <div className="space-y-2">
              <label htmlFor="verificationCode" className="text-neutral-400 text-base font-normal font-['Lato']">
                Verification Code <span className="text-red-500 ml-1">*</span>
              </label>
              <Input
                id="verificationCode"
                type="text"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => {
                  setVerificationCode(e.target.value);
                  if (codeError) setCodeError("");
                }}
                required
                autoFocus
              />
              {codeError && (
                <div className="text-red-600 text-sm font-medium mt-1">
                  {codeError}
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center items-center pt-10 gap-4">
              <MediumButton
                type="submit"
                disabled={isLoading}
                className="w-full"
                bgColor="#0057FF"
              >
                {isLoading ? "Verifying..." : "Verify"}
              </MediumButton>
              
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-blue-600 hover:text-blue-500 text-sm underline"
              >
                Back to email
              </button>
            </div>

            <div className="text-center pt-10 space-y-2">
              <div className="text-sm text-gray-600">
                Didn't receive the code?{" "}
                <button 
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-blue-600 hover:text-blue-500"
                >
                  Resend
                </button>
              </div>
            </div>
          </form>
        </div>
      </AuthLayout>
    );
} 