import { Button } from "@/components/ui/button";
import { staticText } from "@/helper/staticText";
import { useFormStore } from "@/store/zustand";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { placeOrder, verifyOrder } from "@/store/donationSlice";
import { RazorpayOptions } from "@/types/donation";
import { CampaignWithDonationTransactions } from "@/types/campaign";
import { useState } from "react";
import { donateAmount } from "@/helper/donate";
import { donorValidation } from "@/logics/validation";

interface props {
  width: string;
  totalAmount: string;
  campaign: CampaignWithDonationTransactions | any;
  setErrInfo: any;
}

const PaymentAction: React.FC<props> = ({
  width,
  totalAmount,
  campaign,
  setErrInfo,
}) => {
  const [loading, setLoading] = useState(false);
  // const { id } = useParams();
  const { donorDatas, setDonorDatas } = useFormStore();
  const navigate = useNavigate();

  const handleClick = () => {
    if (loading) return;
    const errData = donorValidation(donorDatas);
    setErrInfo(errData);
    const objKeys = Object.keys(errData).length === 0;
    let isValidPan;
    if (!donorDatas.panNo) isValidPan = true;
    else if (donorDatas.panNo && donorDatas.panNo?.length === 10)
      isValidPan = true;
    else isValidPan = false;

    if (objKeys && isValidPan) {
      handlePayment();
    } else {
      toast({
        title: staticText.errMsg,
        status: "error",
      });
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    // Load Razorpay script
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // Create an order on your backend using fetch
    try {
      const payload = {
        tip_percentage: donorDatas.tip_percentage,
        tip_amt: donorDatas.tip_amt,
        sms_wa_opted: donorDatas.whatsappUpdate,
        donor_name: donorDatas.name,
        email: donorDatas.email,
        mobile: donorDatas.mobNo,
        billing_address: donorDatas.address,
        pincode: donorDatas.pincode,
        pan: donorDatas.panNo,
        campaign: campaign?.id!,
        total_amount: Number(totalAmount.replace(/,/g, "")),
        is_anonymous: donorDatas.is_anonymous,
        is_indian: donorDatas.is_indian,
      };

      const response = await placeOrder(payload);
      if (response === null || !response.order) {
        throw new Error("Failed to create Razorpay order.");
      }

      const data = await response.order;
      if (!data?.id) {
        toast({
          title: "Failed to create Razorpay order.",
          status: "error",
        });
        return;
      }

      // Configure Razorpay options
      const options: RazorpayOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "", // Replace with your key ID
        amount: data.amount,
        currency: "INR",
        name: campaign?.master_trust_foundation?.trust_name!,
        order_id: data.id,
        handler: async (response) => {
          // Handle successful payment here
          const res = await verifyOrder(response);
          if (!res) return;
          toast({
            title:
              res.status != 200 ? res.message : "Donation Received, Thank you!",
            status: res.status != 200 ? "error" : "success",
          });

          if (res.status === 200) {
            setDonorDatas({
              tip_percentage: "10",
              tip_amt: 150,
              whatsappUpdate: true,
              name: "",
              email: "",
              mobNo: "",
              address: "",
              pincode: "",
              panNo: "",
              campaign: "",
              total_amount: donateAmount[0],
              is_anonymous: false,
              is_indian: true,
            });
            navigate("/");
          }
        },
        modal: {
          confirm_close: true, // this is set to true, if we want confirmation when clicked on cross button.
          // This function is executed when checkout modal is closed
          // There can be 3 reasons when this modal is closed.
          ondismiss: async (reason: any) => {
            // Reason 1 - when payment is cancelled. It can happen when we click cross icon or cancel any payment explicitly.
            if (reason === undefined) {
              toast({
                title: "Payment Cancelled",
                status: "error",
              });
            }
            // Reason 2 - When modal is auto closed because of time out
            else if (reason === "timeout") {
              toast({
                title: "Payment Timed Out",
                status: "error",
              });
            }
            // Reason 3 - When payment gets failed.
            else {
              toast({
                title: "Payment Failed",
                status: "error",
              });
            }
          },
        },
        prefill: {
          name: donorDatas.name,
          email: donorDatas.email,
          contact: donorDatas.mobNo,
        },
        retry: {
          enabled: true,
        },
        timeout: 300, // Time limit in Seconds
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#F37254",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast({
        title: "An error occurred while creating the order.",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadScript = (src: string) => {
    return new Promise<boolean>((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  return (
    <div className="">
      <Button
        size="lg"
        className={`bg-pimaryBtn hover:bg-primaryClr  text-black text-md font-medium ${width}`}
        onClick={handleClick}
      >
        {loading ? (
          <div
            className="animate-spin rounded-full h-5 w-5 border-t-2 border-black border-opacity-100"
            role="status"
          ></div>
        ) : (
          <>
            Proceed to pay ₹{totalAmount}&nbsp; <ArrowRight size="18" />
          </>
        )}
      </Button>

      <p
        id="ededed"
        className="flex items-center text-[#666666] text-[12px] mt-2"
      >
        <LockKeyhole size="16" />
        &nbsp; {staticText.securePayment}
      </p>
    </div>
  );
};

export default PaymentAction;
