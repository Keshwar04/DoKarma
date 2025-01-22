/**
 * @file login.tsx
 * @description Handles user login functionality
 * @component Login
 *
 * This component renders a login form with username and password inputs.
 * It uses state to manage user input and error messages.
 * Upon successful validation, it navigates to the home page and sets an auth token
 */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLogo from "@/components/utils/appLogo";
import { useTrusts } from "@/hooks/useTrust";
import { useAuthStore } from "@/store/authStore";
import { useCommonStore } from "@/store/zustand";
import { Loader2, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [isVerifiedUser, setIsVerifiedUser] = useState(false);
  const navigate = useNavigate();
  const { setAccessToken } = useCommonStore();
  const { getOnboardingDetails } = useTrusts();
  const { signIn } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await signIn(email, password);
      if (data) {
        setAccessToken(data.user.id);
        const isVerifiedUser = await getOnboardingDetails(data.user.id);
        if (isVerifiedUser) {
          navigate("/");
        } else {
          navigate("/onboarding");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="my-4">
        <AppLogo />
      </div>
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-formColor">Welcome Back</h2>
          <p className="mt-2">Please sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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

          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="link"
              className="text-formColor"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </Button>
            <Button
              type="button"
              variant="link"
              className="text-formColor"
              onClick={() => navigate("/signup")}
            >
              Create account
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
            Sign in
          </Button>
        </form>
        <div style={{ marginTop: 7 }} className="flex justify-center">
          {/* <Button
            type="button"
            variant="link"
            className="text-formColor"
            onClick={() => navigate("/onboarding")}
          >
            Onboarding New Trust
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
