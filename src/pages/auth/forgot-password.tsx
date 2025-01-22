import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLogo from "@/components/utils/appLogo";
import { useAuthStore } from "@/store/authStore";
import { Loader2, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { resetPassword, verifyOTP, updatePassword } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!isOtpSent) {
        const success = await resetPassword(email);
        if (success) {
          setIsOtpSent(true);
        }
      } else if (!isVerified) {
        const success = await verifyOTP(email, otp, "recovery");
        if (success) {
          setIsVerified(true);
        }
      } else {
        const success = await updatePassword(newPassword);
        if (success) {
          navigate("/");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      await resetPassword(email);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    if (!isOtpSent) {
      return (
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
      );
    }

    if (!isVerified) {
      return (
        <>
          <div>
            <Label htmlFor="otp">Verification Code</Label>
            <Input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <Button
            type="button"
            variant="link"
            onClick={handleResendOTP}
            className="w-full text-formColor"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Resend Code
          </Button>
        </>
      );
    }

    return (
      <div>
        <Label htmlFor="newPassword">New Password</Label>
        <div className="relative mt-1">
          <Input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="pl-10"
            required
          />
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        </div>
      </div>
    );
  };

  return (
    <div className=" min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="my-4">
        <AppLogo />
      </div>
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-formColor">Reset Password</h2>
          <p className="mt-2 ">
            {!isOtpSent
              ? "Enter your email to reset password"
              : !isVerified
              ? "Enter the verification code sent to your email"
              : "Enter your new password"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {renderStep()}

          <div className="flex justify-between">
            <Button
              type="button"
              variant="link"
              className="text-formColor"
              onClick={() => navigate("/login")}
              disabled={isLoading}
            >
              Back to login
            </Button>
            <Button
              type="submit"
              className="bg-formColor hover:bg-[#1F4473]"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              {!isOtpSent
                ? "Send Code"
                : !isVerified
                ? "Verify Code"
                : "Reset Password"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
