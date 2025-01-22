import { useTrusts } from "@/hooks/useTrust";
import OnBoarding from "@/pages/auth/onBoarding";
import { useCommonStore } from "@/store/zustand";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const OnboardingGaurd = () => {
  const { accessToken } = useCommonStore();
  const { getOnboardingDetails } = useTrusts();

  const [isVerifiedUser, setIsVerifiedUser] = useState<any>(null);

  const getOnboardingData = async () => {
    const res = await getOnboardingDetails(accessToken);
    setIsVerifiedUser(res);
  };

  useEffect(() => {
    if (accessToken) getOnboardingData();
  }, [accessToken]);
  if (!accessToken || isVerifiedUser) {
    return <Navigate to="/" />;
  } else {
    return <OnBoarding />;
  }
};

export default OnboardingGaurd;
