import { useTrusts } from "@/hooks/useTrust";
import Home from "@/pages/home/home";
import { useAuthStore } from "@/store/authStore";
import { useCommonStore } from "@/store/zustand";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import FallbackUI from "./fallbackUI";

const RouteValidator = () => {
  const { user } = useAuthStore();
  const { accessToken } = useCommonStore();
  const { getOnboardingDetails } = useTrusts();

  const [isVerifiedUser, setIsVerifiedUser] = useState<any>(null);

  const getOnboardingData = async () => {
    const res = await getOnboardingDetails(accessToken);
    setIsVerifiedUser(res || false);
  };

  useEffect(() => {
    if (accessToken) getOnboardingData();
  }, [accessToken]);

  if (!user) {
    return <Home />;
  }

  if (isVerifiedUser == null) {
    return <FallbackUI />;
  }

  return isVerifiedUser ? <Home /> : <Navigate to="/onboarding" />;
};

export default RouteValidator;
