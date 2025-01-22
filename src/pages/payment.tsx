import { useEffect, useState } from "react";
import PaymentAction from "@/components/ui-components/doante/paymentAction";
import PaymentAmount from "@/components/ui-components/doante/paymentAmount";
import PersonDetails from "@/components/ui-components/doante/personDetails";
import TotalAmount from "@/components/ui-components/doante/totalAmount";
// import PaymentButton from "@/components/ui-components/doante/paymentButton"
import { donateAmount } from "@/helper/donate";
import { useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { getCampaignById } from "@/store/campaignSlice";
// import { Campaign } from "@/types/campaign";
import { CampaignWithDonationTransactions } from "@/types/campaign";
import { useFormStore } from "@/store/zustand";
// import {  useMenuStore } from "@/store/zustand";
/* eslint-disable @typescript-eslint/no-explicit-any */

const Donate = () => {
  // const { setProfileMenu } = useMenuStore();
  const [errInfo, setErrInfo] = useState<any>({});
  const [tempPanErr, setTempPanErr] = useState();
  const [amount, setAmount] = useState<any>({
    user: donateAmount[0],
    prefer: "",
  });
  const [tips, setTips] = useState<any>({ rate: "10", overAllTips: "" });
  const [tipsAmount, setTipsAmount] = useState<any>(0);
  const [campaign, setCampaign] =
    useState<CampaignWithDonationTransactions | null>(null);
  const { donorDatas, setDonorDatas } = useFormStore();
  const tempTotal = Number(amount.user.replace(",", "")) + tipsAmount;
  const totalAmount = tempTotal.toLocaleString("en-IN");

  const fetchCampaignByName = async (id: string) => {
    try {
      const data = await getCampaignById(id);
      setCampaign(data as unknown as CampaignWithDonationTransactions);
    } catch (err: any) {
      console.error(err.message);
      toast({
        status: "error",
        title: "Error",
        description: err.message,
      });
    }
  };

  // useEffect(() => setProfileMenu("Favourites"), []);
  const { campaign_name }: any = useParams();
  const campaignNameWithSpaces = campaign_name?.replace(/-/g, " ");

  useEffect(() => {
    setDonorDatas({
      ...donorDatas,
      tip_percentage: tips.rate,
      tip_amt: tipsAmount,
    });
  }, [tips, tipsAmount]);

  useEffect(() => {
    if (campaignNameWithSpaces) {
      fetchCampaignByName(campaignNameWithSpaces);
    }
  }, [campaignNameWithSpaces]);
  console.log(campaign);

  return (
    <div className="grid grid-cols-12 gap-6 sm:h-screen sm:overflow-y-scroll scrollbarHide py-8">
      <div className="col-span-12 md:col-span-7 lg:col-span-8">
        <PaymentAmount
          amount={amount}
          setAmount={setAmount}
          tipsAmount={tipsAmount}
          setTipsAmount={setTipsAmount}
          tips={tips}
          setTips={setTips}
        />

        <PersonDetails
          errInfo={errInfo}
          setErrInfo={setErrInfo}
          tempPanErr={tempPanErr}
          setTempPanErr={setTempPanErr}
        />
        <PaymentAction
          width="w-full sm:w-[300px]"
          totalAmount={totalAmount}
          campaign={campaign}
          setErrInfo={setErrInfo}
        />
        {/* <PaymentButton width='w-[300px]' totalAmount={totalAmount}
          setErrInfo={setErrInfo} /> */}
      </div>

      <div className="col-span-12 md:col-span-5 lg:col-span-4 sm:h-screen sm:sticky sm:top-0">
        <TotalAmount
          amount={amount}
          tipsAmount={tipsAmount}
          tips={tips}
          totalAmount={totalAmount}
          setErrInfo={setErrInfo}
          campaign={campaign}
        />
      </div>
    </div>
  );
};

export default Donate;
