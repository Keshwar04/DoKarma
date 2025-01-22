import supabase from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { staticText } from "@/helper/staticText";

export const createTrust = async (campaignData: any) => {
  const formattedData = {
    ...campaignData,
    created_at: new Date().toISOString(),
    dob: campaignData.dob?.toISOString() || null,
  };

  return await supabase
    .from("master_trust_foundation")
    .insert(formattedData as any);
};

export const createSubscribers = async (email: any) => {
  const formattedData = {
    email,
    created_at: new Date().toISOString(),
  };

  try {
    const { error, status } = await supabase
      .from("subscriber_list" as any)
      .insert(formattedData as any);
    if (status === 201) {
      toast({ title: staticText.emailSubscribed, status: "success" });
    }
    if (error) {
      toast({ title: error.message, status: "error" });
    }
  } catch (err: any) {
    toast({ title: err.message, status: "error" });
  }
};
