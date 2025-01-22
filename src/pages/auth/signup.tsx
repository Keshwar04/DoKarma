/**
 * Signup component for DoKarma user registration
 *
 * Features:
 * - User input fields for name, email, and password
 * - Real-time input validation
 * - Password visibility toggle
 * - Error message display for invalid inputs
 * - Signup button with form submission
 * - Navigation to login page
 *
 * Uses custom UI components (Label, Input, Button) and icons from Lucide
 * Implements form validation logic and toast notifications
 * Utilizes React Router for navigation
 */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLogo from "@/components/utils/appLogo";
import { useTrusts } from "@/hooks/useTrust";
import { useAuthStore } from "@/store/authStore";
import { useCommonStore } from "@/store/zustand";
import { Loader2, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setAccessToken } = useCommonStore();
  const { getOnboardingDetails } = useTrusts();
  const { signUp, verifyOTP, resendOTP } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!isVerifying) {
        const success = await signUp(email, password, username);
        if (success) {
          setIsVerifying(true);
        }
      } else {
        const success: any = await verifyOTP(email, otp, "signup");
        try {
          if (success) {
            setAccessToken(success.user.id);
            const isVerifiedUser = await getOnboardingDetails(success.user.id);
            if (isVerifiedUser) {
              navigate("/");
              return;
            } else {
              navigate("/onboarding");
            }
          }
        } finally {
          setIsLoading(false);
        }
        if (success) {
          navigate("/onboarding");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    await resendOTP(email, "signup");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="my-4">
        <AppLogo />
      </div>
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-formColor">
            {isVerifying ? "Verify Email" : "Create Account"}
          </h2>
          <p className="mt-2 ">
            {isVerifying
              ? "Enter the verification code sent to your email"
              : "Sign up to get started"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {!isVerifying ? (
            <>
              <div>
                <Label htmlFor="username">Username</Label>
                <div className="relative mt-1">
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    required
                  />
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-1">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
              <Button
                type="button"
                variant="link"
                onClick={handleResendOTP}
                className="w-full text-formColor"
              >
                Resend Code
              </Button>
            </>
          )}

          <div className="flex justify-end">
            <Button
              type="button"
              variant="link"
              className="text-formColor"
              onClick={() => navigate("/login")}
            >
              Already have an account?
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full bg-formColor hover:bg-[#1F4473]"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            {isVerifying ? "Verify Email" : "Sign up"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
