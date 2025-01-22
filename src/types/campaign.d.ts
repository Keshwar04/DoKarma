export interface CreateCampaign {
  campaign_name: string;
  category: string;
  city: string;
  description: string;
  currency: string;
  fundraise_type: string;
  end_date: Date;
  target_amount: number;
  amount_type: string;
  fixed_amount: number;
  minimum_amount: number;
  cover_image: string;
  thankyou_note: string;
}

export interface Campaign {
  id: string;
  campaign_name: string;
  category: string;
  description: string;
  creator_id: string;
  thankyou_note: string;
  start_date: Date;
  end_date: string;
  is_urgent: boolean;
  status: string;
  city: string;
  currency: string;
  fundraise_type: string;
  target_amount: number;
  received_amount: number;
  amount_type: string;
  fixed_amount: number;
  minimum_amount: number;
  cover_image: string;
  project_id: string;
  progress_percentage: number;
  no_of_donations: number;
}

export interface DonationTransaction {
  id: string;
  total_amount: number;
  tip_amt: number;
  donor_name: string;
  created_at: string;
}

export interface MasterTrustFoundation {
  id: string;
  trust_name: string;
  trustee_name: string;
}

export interface CampaignWithDonationTransactions extends Campaign {
  donation_transaction: DonationTransaction[];
  master_trust_foundation: MasterTrustFoundation;
}

export interface CampaignWithTrust extends Campaign {
  master_trust_foundation: MasterTrustFoundation;
}
