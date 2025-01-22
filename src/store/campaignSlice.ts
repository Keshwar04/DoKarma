/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "@/hooks/use-toast";
import { CreateCampaign } from "@/types/campaign.d";
import supabase from "../lib/supabase"; // Import your Supabase client instance

export const getDashboardCampaigns = async () => {
  try {
    const trust_id = localStorage.getItem("accessToken");

    if (!trust_id) return "no_auth";
    const { data, error } = await supabase
      .from("campaign_details")
      .select("*")
      .eq("owner", trust_id);

    if (error) {
      toast({ title: error.message, status: "error" });
      return null;
    }
    return data;
  } catch (err: any) {
    console.error(err.message);
    toast({ status: "error", title: "Error", description: err.message });
    return null;
  }
};

export const getCampaigns = async () => {
  try {
    const { data, error } = await supabase
      .from("campaign_details")
      .select("*, master_trust_foundation(id, trust_name, trustee_name)");

    if (error) throw new Error(error.message);
    return data;
  } catch (error: any) {
    toast({ title: error.message, status: "error" });
    return [];
  }
};

export const getCampaignById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("campaign_details")
      .select(
        "*,  donation_transaction(id, total_amount, tip_amt, donor_name, created_at), master_trust_foundation(id, trust_name, trustee_name)"
      )
      .eq("campaign_name", id)
      .filter("donation_transaction.payment_status", "eq", "captured")
      .single();
    if (error) {
      // console.error('Error fetching data:', error);
      return null;
    } else {
      // console.log('Data retrieved:', data);
      return data;
    }
  } catch (error: any) {
    // console.error('Error fetching data:', error);
    toast({ title: error?.message, status: "error" });
    return null;
  }
};

export const createCampaign = async (campaignData: Partial<CreateCampaign>) => {
  const { data } = await supabase.from("campaign_details").insert([
    {
      ...campaignData,
      end_date: campaignData.end_date?.toISOString() || null,
    } as any,
  ]);
  if (data) return data;

  // return await supabase.from("campaign_details").insert({
  //   ...campaignData,
  //   end_date: campaignData.end_date?.toISOString() || null,
  // } as any);
};

export const updateCampaign = async (
  id: string,
  updates: Partial<CreateCampaign>
) => {
  try {
    const trust_id = localStorage.getItem("accessToken");
    if (!trust_id) return "no_auth";
    const { error } = await supabase
      .from("campaign_details")
      .update(updates as any)
      .eq("id", id)
      .eq("owner", trust_id);

    if (error) {
      toast({
        title: "Failed to update campaign",
        description: error.message,
        status: "error",
      });
      return false;
    }
    return true;
  } catch (error: any) {
    toast({ title: error.message, status: "error" });
    return false;
  }
};

export const deleteCampaign = async (id: number) => {
  const { data, error } = await supabase
    .from("campaign_details")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  return data;
};

export const uploadImageToBucket = async (file: File, bucketName: string) => {
  try {
    // Generate a unique filename (optional)
    const filePath = `${Date.now()}_${file.name.replace(/\s+/g, "")}`;

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: "3600", // Cache settings (optional)
        upsert: false, // If true, overwrites existing file
      });

    if (error) {
      // console.error("Image upload error:", error.message);
      return null;
    }

    // console.log("Image uploaded:", data);
    return data.path; // Return the file path for further use (e.g., storing in a table)
  } catch (error: any) {
    toast({ title: error.message, status: "error" });
    return null;
  }
};

export const removeImageFromBucket = async (file: string) => {
  const bucketName = import.meta.env.VITE_SUPABASE_BUCKET_NAME;
  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .remove([file]);

    if (error) {
      // console.error("Image upload error:", error.message);
      return null;
    }
    console.log("File deleted successfully:", data);
    return true;
  } catch (error: any) {
    toast({ title: error.message, status: "error" });
    return null;
  }
};
