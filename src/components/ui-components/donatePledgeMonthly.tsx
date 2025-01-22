import { useState } from "react";
import TotalAmount from "@/components/ui-components/doante/totalAmount";
import PaymentAmount from "@/components/ui-components/doante/paymentAmount";
import PersonDetails from "@/components/ui-components/doante/personDetails";
import PaymentAction from "@/components/ui-components/doante/paymentAction";
import { donateAmount } from "@/helper/donate";
import { monthlyDonate } from "@/helper/home";
import { useParams } from "react-router-dom";
const DonatePledgeMonthly = () => {
  const [amount, setAmount] = useState<any>({
    user: donateAmount[0],
    prefer: "",
  });
  const [tips, setTips] = useState<any>({ rate: "10", overAllTips: "" });
  const [tipsAmount, setTipsAmount] = useState<any>(0);
  const [errInfo, setErrInfo] = useState<any>({});
  const [tempPanErr, setTempPanErr] = useState();
  //   const [campaign, setCampaign] = useState<any>(null);
  const tempTotal = Number(amount.user.replace(",", "")) + tipsAmount;
  const totalAmount = tempTotal.toLocaleString("en-IN");
  const { id } = useParams();
  const title = id?.replace(/-/g, " ");
  const supportCauses = monthlyDonate.filter((e) => e.title === title)[0];
  // const img = monthlyDonate[idx].img;
  const mergedTrustName = {
    ...supportCauses,
    master_trust_foundation: {
      trust_name: "do-karma",
    },
  };
  return (
    <div className="grid grid-cols-12 gap-6 sm:h-screen sm:overflow-y-scroll scrollbarHide py-5">
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
          width="w-[300px]"
          totalAmount={totalAmount}
          campaign={mergedTrustName}
          setErrInfo={setErrInfo}
        />
      </div>
      <div className="col-span-12 md:col-span-5 lg:col-span-4 sm:h-screen sm:sticky sm:top-0">
        <TotalAmount
          amount={amount}
          tipsAmount={tipsAmount}
          tips={tips}
          totalAmount={totalAmount}
          setErrInfo={setErrInfo}
          campaign={mergedTrustName}
          img={supportCauses.img}
        />
      </div>
    </div>
  );
};

export default DonatePledgeMonthly;
