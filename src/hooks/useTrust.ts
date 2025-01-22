import supabase from "@/lib/supabase";
// import { createTrust } from "@/store/trustSlice";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useCommonStore } from "@/store/zustand";

export const useTrusts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<any>({});
  const [isVerifiedUser] = useState(false);
  const { accessToken } = useCommonStore();
  const addTrust = async (trust: any) => {
    const formattedData = {
      ...trust,
      created_at: new Date().toISOString(),
      creator: accessToken,
      dob: trust.dob?.toISOString() || null,
    };
    setIsLoading(true);
    try {
      const { error, status } = await supabase
        .from("master_trust_foundation")
        .insert(formattedData as any);
      if (status === 201) {
        setIsLoading(false);
        return true;
      }
      if (error) {
        setIsLoading(false);
        toast({ title: error.message, status: "error" });
        return false;
      }
    } catch (err: any) {
      setIsLoading(false);
      toast({ title: err.message, status: "error" });
      return false;
    }
  };

  const getTrust = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("master_trust_foundation")
        .select("*")
        .eq("creator", userId);
      if (error) throw new Error(error.message);

      return data;
    } catch (error: any) {
      toast({ title: error.message, status: "error" });
      return [];
    }
  };

  const getOnboardingDetails = async (userId: string) => {
    const data = await getTrust(userId);
    if (data && data[0]) {
      setUserData(data[0]);
      const verifiedStatus =
        (data[0].verified && data[0].verified?.toString()) || "";
      if (verifiedStatus) {
        return true;
      } else {
        return false;
      }
    }
  };

  return {
    addTrust,
    isLoading,
    setIsLoading,
    getTrust,
    userData,
    getOnboardingDetails,
    isVerifiedUser,
  };
};
