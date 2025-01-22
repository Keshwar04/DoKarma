export interface Donation {
  sms_wa_opted: boolean;
  tip_percentage: number;
  tip_amt: number;
  donor_name: string;
  email: string;
  mobile: string;
  billing_address: string;
  pincode: string;
  pan: string;
  campaign: string;
  total_amount: number;
}

export interface VerifyOrder {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  order_id: string;
  handler: (response: any) => void;
  modal: {
    confirm_close: boolean;
    ondismiss: (arg: any) => void;
  };
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: Record<string, string>;
  theme: {
    color: string;
  };
  retry: {
    enabled: boolean;
  };
  timeout: number;
}

export interface DonationDataForDashboard {
  id: string;
  donor_name: string;
  total_amount: number;
  pincode: string;
  billing_address: string;
  email: string;
  campaign_details: {
    id: string;
    category: string;
  };
}
