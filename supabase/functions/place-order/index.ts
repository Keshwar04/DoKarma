// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const RAZORPAY_KEY_ID = Deno.env.get("RAZORPAY_KEY_ID")!;
const RAZORPAY_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET")!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

interface Donation {
  whatsappUpdate: boolean;
  tip_percentage: number;
  tip_amt: number;
  name: string;
  email: string;
  mobNo: string;
  address: string;
  pincode: string;
  panNo: string;
  campaign: string;
  total_amount: number;
}

console.log("Starting Razorpay Order Creation Function");

const headers = {
  "Access-Control-Allow-Origin": "*", // Consider specifying your allowed domain if more restrictive control is needed
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req) => {
  console.log("Request received", req.method);
  
  try {
    if (req.method === "OPTIONS") {
      return new Response(null, {
        headers,
      });
    }

    const donation: Donation = await req.json();

    // Create the order on Razorpay using the fetch API
    const orderPayload = {
      amount: donation.total_amount * 100, // Amount in paise (Razorpay requires amount in the smallest currency unit)
      currency: "INR",
      receipt: `receipt_${new Date().getTime()}`,
    };

    const encodedCredentials = btoa(
      `${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`
    );
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${encodedCredentials}`,
      },
      body: JSON.stringify(orderPayload),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to create order on Razorpay: ${await response.text()}`
      );
    }

    const razorpayOrder = await response.json();
    const orderId = razorpayOrder.id;

    // Save the donation data along with the order ID in the Supabase table
    const { error } = await supabase.from("donation_transaction").insert([
      {
        ...donation,
        razorpay_order_id: orderId, // Add the Razorpay Order ID
      },
    ]);

    if (error) {
      throw new Error(`Error saving to Supabase: ${error.message}`);
    }

    // Return the Razorpay order ID to the frontend
    const data = {
      order: razorpayOrder,
      message: "Order created successfully",
    };

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json", ...headers },
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json", ...headers },
      status: 500,
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/place-order' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
