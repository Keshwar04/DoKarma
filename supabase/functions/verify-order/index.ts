// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import { createClient } from "https://esm.sh/@supabase/supabase-js";
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

enum PaymentStatusType {
  PENDING = "pending",
  CAPTURED = "captured",
  FAILED = "failed",
}

const headers = {
  "Access-Control-Allow-Origin": "*", // Consider specifying your allowed domain if more restrictive control is needed
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req) => {
  try {
    if (req.method === "OPTIONS") {
      return new Response(null, {
        headers,
      });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return new Response("Missing parameters", { status: 400 });
    }

    const key = Deno.env.get("RAZORPAY_KEY_SECRET");
    const data = `${razorpay_order_id}|${razorpay_payment_id}`;

    // Creating HMAC with Deno's crypto API
    const keyBuffer = new TextEncoder().encode(key);
    const dataBuffer = new TextEncoder().encode(data);

    const hmacKey = await crypto.subtle.importKey(
      "raw",
      keyBuffer,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signatureBuffer = await crypto.subtle.sign(
      "HMAC",
      hmacKey,
      dataBuffer
    );
    const computedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    // Compare computed signature with Razorpay's provided signature
    if (computedSignature !== razorpay_signature) {
      return new Response("Signature verification failed", { status: 400 });
    }

    // Verification successful, update Supabase transaction table
    const { data: donation_transaction, error: donation_transaction_error } =
      await supabase
        .from("donation_transaction")
        .update({ payment_status: PaymentStatusType.CAPTURED })
        .eq("razorpay_order_id", razorpay_order_id)
        .select("*")
        .single();

    if (donation_transaction_error || !donation_transaction) {
      console.error("Supabase update error:", donation_transaction_error);
      return new Response(
        JSON.stringify({
          message: donation_transaction_error
            ? donation_transaction_error.message
            : "Unable to update the Donation Transaction.",
          status: 500,
        }),
        { status: 500 }
      );
    }

    const { data: related_campaign, error: campaign_error } = await supabase
      .from("campaign_details")
      .select("*, owner(id, creator)")
      .eq("id", donation_transaction.campaign)
      .single();

    if (campaign_error || !related_campaign) {
      console.error("Supabase campaign error:", campaign_error);
      return new Response(
        JSON.stringify({
          message: campaign_error
            ? campaign_error.message
            : "Unable to find the Campaign.",
          status: 500,
        }),
        { status: 500 }
      );
    }
    // Update Supabase campaign table
    const received_amount =
      donation_transaction.total_amount - donation_transaction.tip_amt;
    const updated_received_amount =
      related_campaign.received_amount + received_amount;
    const updated_progress_percentage =
      (updated_received_amount / related_campaign.target_amount) * 100;
    const status =
      updated_progress_percentage >= 100 ? "Concluded" : "In Progress";

    const { error: campaign_update_error } = await supabase
      .from("campaign_details")
      .update({
        received_amount: updated_received_amount,
        progress_percentage: updated_progress_percentage,
        no_of_donations: related_campaign.no_of_donations + 1,
        status: status,
      })
      .eq("id", donation_transaction.campaign);

    if (campaign_update_error) {
      console.error("Supabase campaign update error:", campaign_update_error);
      return new Response(
        JSON.stringify({
          message: "Unable to update the Campaign but donation captured.",
          status: 500,
        }),
        { status: 500 }
      );
    }

    const { error: donation_reupdate_error } = await supabase
      .from("donation_transaction")
      .update({
        trust_id: related_campaign.owner.id,
      })
      .eq("id", donation_transaction.id);
    console.log("donation_reupdate_error", donation_reupdate_error);

    return new Response(
      JSON.stringify({
        message: "Donation captured successfully",
        status: 200,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...headers },
      }
    );
  } catch (error) {
    console.error("Error verifying order:", error);
    return new Response("Internal server error", {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
  }
});
