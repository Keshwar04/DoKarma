import Payment from "./paymentAction";
import { staticText } from "@/helper/staticText";

const TotalAmount = ({
  amount,
  tipsAmount,
  tips,
  totalAmount,
  campaign,
  setErrInfo,
  img,
}: any) => {
  const userAmount = Number(amount.user.replace(",", "")).toLocaleString(
    "en-IN"
  );

  return (
    <div className="border shadow-sm rounded-xl p-4 sm:p-5 w-full">
      <img
        src={campaign?.cover_image || img}
        className="rounded h-[190px] w-full object-cover"
        alt="campaign"
      />
      <h1 className="line-clamp-2 text-lg font-bold mt-2 mb-5">
        {campaign?.campaign_name}
      </h1>
      <div className="flex justify-between pt-4 border-t mb-4">
        <p className="text-[#666666]">Donation Amount</p>
        <p>₹{userAmount}</p>
      </div>
      <div className="flex justify-between pb-4 border-b">
        <p className="text-[#666666]">Tip : {tips.rate}%</p>
        <p>₹{tipsAmount.toLocaleString("en-IN")}</p>
      </div>
      <div className="flex justify-between mt-2 mb-5 text-lg font-bold">
        <p>Total Donation</p>
        <p>₹{totalAmount}</p>
      </div>
      <p className="text-[#666666] text-sm mb-2">{staticText.taxCerificate}</p>
      <Payment
        width="w-full"
        totalAmount={totalAmount}
        campaign={campaign}
        setErrInfo={setErrInfo}
      />
    </div>
  );
};

export default TotalAmount;
