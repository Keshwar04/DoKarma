import { toast } from "@/hooks/use-toast";
import supabase from "@/lib/supabase";
import { Donation, VerifyOrder } from "@/types/donation";

export const placeOrder = async (payload: Donation) => {
  console.log(payload);

  try {
    const res = await fetch(
      "https://arcxjjcrhkirjsfkrnsw.supabase.co/functions/v1/place-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await res.json();
    const { error } = data;
    if (error) throw new Error(error.message);
    return data;
  } catch (error: any) {
    toast({ title: error.message, status: "error" });
    return null;
  }
};

export const verifyOrder = async (payload: VerifyOrder) => {
  try {
    const res = await fetch(
      "https://arcxjjcrhkirjsfkrnsw.supabase.co/functions/v1/verify-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await res.json();
    const { error } = data;
    if (error) throw new Error(error.message);
    return data;
  } catch (error: any) {
    toast({ title: error.message, status: "error" });
    return null;
  }
};

export const getDashboardDonations = async (id: string) => {
  console.log(id);

  try {
    if (!id) return "no_auth";
    const { data, error } = await supabase
      .from("donation_transaction")
      .select(
        "id, donor_name, total_amount, pincode, billing_address, email, campaign_details(id, category)"
      )
      .eq("trust_id", id)
      .eq("payment_status", "captured")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: error.message, status: "error" });
      return null;
    }
    console.log(data);

    return data?.map((item) => ({
      ...item,
      campaign_details: Array.isArray(item.campaign_details)
        ? item.campaign_details[0]
        : item.campaign_details,
    }));
  } catch (err: any) {
    console.error(err.message);
    toast({ status: "error", title: "Error", description: err.message });
    return null;
  }
};
