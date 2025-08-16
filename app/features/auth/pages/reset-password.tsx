import { MediumButton } from "@/common/ui/medium-button";
import { Input } from "@/common/ui/input";
import { confirmResetPassword } from "aws-amplify/auth";
import { useState } from "react"; 
import { useLocation, useNavigate } from "react-router";
import AuthLayout from "@/features/auth/layouts/AuthLayout";

export default function ResetPassword() {
    const location = useLocation();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [generalError, setGeneralError] = useState("");

    // Get email and verification code from previous page
    const { email, verificationCode } = location.state || {};
    
    // If no email or verification code in state, redirect to forgot-password
    if (!email || !verificationCode) {
        navigate("/forgot-password");
        return null;
    }

    const validateNewPassword = (password: string) => {
        if (!password.trim()) {
            return "New password is required.";
        }
        if (password.length < 8) {
            return "Password must be at least 8 characters long.";
        }
        return "";
    };

    const validateConfirmPassword = (password: string, confirmPwd: string) => {
        if (!confirmPwd.trim()) {
            return "Please confirm your password.";
        }
        if (password !== confirmPwd) {
            return "Passwords do not match.";
        }
        return "";
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setNewPasswordError("");
        setConfirmPasswordError("");
        setGeneralError("");

        // Validate both fields
        const newPwdValidation = validateNewPassword(newPassword);
        const confirmPwdValidation = validateConfirmPassword(newPassword, confirmPassword);
        
        if (newPwdValidation) {
            setNewPasswordError(newPwdValidation);
        }
        if (confirmPwdValidation) {
            setConfirmPasswordError(confirmPwdValidation);
        }
        
        if (newPwdValidation || confirmPwdValidation) {
            return;
        }

        setIsLoading(true);

        try {
            await confirmResetPassword({ 
                username: email, 
                confirmationCode: verificationCode, 
                newPassword: newPassword 
            });
            console.log("✅ Password reset successful");
            navigate("/login");
        } catch (error: any) {
            console.error("❌ Password reset failed:", error);
            setGeneralError(error.message || "Failed to reset password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    } 

    return (
      <AuthLayout
        title="Reset your password"
        subtitle="Please enter your new password below."
        iconSrc="/images/lock.svg"
        iconAlt="Reset Password"
      >
        <div className="flex justify-center w-full">
          <form onSubmit={handleSubmit} className="space-y-4 w-10/12 max-w-md pt-14" noValidate>
            {generalError && (
              <div className="text-red-600 text-sm font-medium mb-4">
                {generalError}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="newPassword" className="text-neutral-400 text-sm font-medium font-['Lato']">
                New Password 
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (newPasswordError) setNewPasswordError("");
                  if (confirmPasswordError && confirmPassword) {
                    const confirmValidation = validateConfirmPassword(e.target.value, confirmPassword);
                    if (!confirmValidation) setConfirmPasswordError("");
                  }
                }}
                required
                autoFocus
              />
              {newPasswordError && (
                <div className="text-red-600 text-sm font-medium mt-1">
                  {newPasswordError}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-neutral-400 text-sm font-medium font-['Lato']">
                Confirm Password <span className="text-red-500 ml-1">*</span>
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (confirmPasswordError) setConfirmPasswordError("");
                }}
                required
              />
              {confirmPasswordError && (
                <div className="text-red-600 text-sm font-medium mt-1">
                  {confirmPasswordError}
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
                {isLoading ? "Resetting..." : "Reset Password"}
              </MediumButton>
            </div>
          </form>
        </div>
      </AuthLayout>
    );
}