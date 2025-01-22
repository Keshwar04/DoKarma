/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useCampaigns.ts
import supabase from "@/lib/supabase";
import {
  createCampaign,
  deleteCampaign,
  getCampaigns,
  updateCampaign,
  uploadImageToBucket,
} from "@/store/campaignSlice";
// import { useMenuStore } from "@/store/zustand";
import { CampaignWithTrust, CreateCampaign } from "@/types/campaign.d";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { toast } from "./use-toast";

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<CampaignWithTrust[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getCampaigns();
      setCampaigns(data as unknown as CampaignWithTrust[]);
      //save in store.
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addCampaign = async (campaign: CreateCampaign) => {
    console.log(campaign);

    try {
      setLoading(true);
      const res = await createCampaign(campaign);
      console.log(res);

      //   setCampaigns((prev) => [...prev, ...(data || [])]);
      if (res) {
        fetchData();
      }
      setLoading(false);
      return res;
    } catch (err: any) {
      setError(err.message);
    }
  };

  const removeCampaign = async (id: number) => {
    try {
      await deleteCampaign(id);
      fetchData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const updateCampaignById = async (
    id: string,
    updates: Partial<CreateCampaign>
  ) => {
    try {
      const res = await updateCampaign(id, updates);
      if (!res) {
        toast({ title: "Failed to update campaign", status: "error" });
      } else if (res === "no_auth") {
        toast({ title: "You are not authenticated", status: "error" });
        // localStorage.removeItem("accessToken");
        localStorage.removeItem("trust_id");
        // navigate("/");
        window.location.reload();
      }
      if (res) fetchData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const uploadImage = async (file: File) => {
    // Ensure you have a bucket created in Supabase Storage
    if (file) {
      const bucketName = import.meta.env.VITE_SUPABASE_BUCKET_NAME;
      const uploadedFilePath = await uploadImageToBucket(file, bucketName);
      if (uploadedFilePath) {
        // Get the public URL (optional)
        const { data } = supabase.storage
          .from(bucketName)
          .getPublicUrl(uploadedFilePath);
        return data.publicUrl;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  return {
    campaigns,
    loading,
    error,
    addCampaign,
    removeCampaign,
    uploadImage,
    updateCampaignById,
  };
};
