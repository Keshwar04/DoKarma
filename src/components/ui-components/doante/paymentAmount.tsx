import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { donateAmount, tip } from "@/helper/donate";
import { ChevronDown, ChevronUp } from "lucide-react";
import { staticText } from "@/helper/staticText";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { calculateTips } from "@/logics/logics";
// import { calculatePercentage } from "@/logics/logics";
// import { Dialog, DialogTrigger } from "@/components/ui/dialog";
// import GiftCard from "@/components/utils/dialog/giftCard";
import { toast } from "@/hooks/use-toast";
import { useFormStore } from "@/store/zustand";
// import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
// import GiftCard from "../drawer/giftCard";

const PaymentAmount = ({
  amount,
  setAmount,
  tipsAmount,
  setTipsAmount,
  tips,
  setTips,
}: any) => {
  const [toggle, setToggle] = useState<any>({
    dropdownIcon: false,
    userEnter: false,
    others: false,
  });
  const { donorDatas, setDonorDatas } = useFormStore();

  const handleDonateAmt = (e: string) => {
    setAmount({ ...amount, prefer: e, user: e });
    setToggle({ ...toggle, userEnter: false });
  };

  const handleChange = (e: any) => {
    const newAmt = e.target.value.replace(/\D/g, "");
    setAmount({ ...amount, user: newAmt });
    setToggle({ ...toggle, userEnter: true });
  };

  const handleTipRate = (e: any) => {
    setTips({ ...tips, rate: e });
    setToggle({ ...toggle, others: false });
  };

  const handleCheckBoxInput = (e: any, name: any) => {
    setDonorDatas({ [name]: e });
  };

  const handleTipAmtChange = (e: any) => {
    const newAmt = e.target.value.replace(/\D/g, "");
    setToggle({ ...toggle, others: true });
    // setTipsAmount(newAmt)
    // const percentage = calculatePercentage(e.target.value, amount.user)
    setTips({ ...tips, rate: newAmt });
  };
  useEffect(() => {
    if (toggle.userEnter && !amount?.user) {
      setAmount({ ...amount, prefer: "" });
    }
  }, [toggle.userEnter, amount?.user]);

  useEffect(() => {
    if (tips.rate < 2) {
      toast({ title: staticText.minTip, status: "error" });
    } else {
      setTipsAmount(calculateTips(amount.user, tips.rate));
    }
  }, [tips?.rate, amount?.user, toggle.others]);

  useEffect(() => {
    setAmount({ ...amount, prefer: donateAmount[0] });
  }, []);

  return (
    <div className="border shadow-sm rounded-xl p-3 md:p-7 w-full bg-[#faf9f9]">
      <h1 className="font-semibold text-lg">Donation Amount</h1>
      <div className="flex gap-x-3 my-5">
        {donateAmount.map((e: string) => (
          <Button
            key={e}
            variant="outline"
            className={`w-full font-semibold text-md 
                             ${
                               amount?.prefer === e &&
                               !toggle.userEnter &&
                               "border border-formColor text-formColor"
                             }`}
            onClick={() => handleDonateAmt(e)}
          >
            {e}
          </Button>
        ))}
      </div>
      <div className="relative">
        <Input
          maxLength={7}
          placeholder="Other Amount ₹250 or more"
          className="ps-[40px] text-md"
          onChange={handleChange}
          value={amount?.user}
        />
        <span className="absolute top-[7px] left-[20px] text-lg">₹</span>
      </div>
      <div className="flex justify-between my-5">
        <div className="flex items-center">
          <span>Tip :</span>
          <span className="text-formColor text-sm">
            &nbsp;{tips?.rate}%&nbsp;
          </span>
          <span
            onClick={() =>
              setToggle({ ...toggle, dropdownIcon: !toggle.dropdownIcon })
            }
            className="cursor-pointer text-formColor"
          >
            {toggle.dropdownIcon ? (
              <ChevronUp size="16" />
            ) : (
              <ChevronDown size="16" />
            )}
          </span>
        </div>
        <p>₹{tipsAmount.toLocaleString("en-IN") || 0}</p>
      </div>
      {toggle.dropdownIcon && (
        <>
          <div className="flex gap-x-3">
            {tip.map((e: any) => (
              <Button
                key={e}
                size="lg"
                variant="outline"
                className={`w-full text-md 
                                 ${
                                   tips.rate === e &&
                                   !toggle.others &&
                                   "border border-formColor text-formColor"
                                 }`}
                onClick={() => handleTipRate(e)}
              >
                {e}%
              </Button>
            ))}
            <Button
              size="lg"
              variant="outline"
              className={`w-full text-md 
                               ${
                                 toggle.others &&
                                 "border border-formColor text-formColor"
                               }`}
              onClick={() => setToggle({ ...toggle, others: true })}
            >
              Other
            </Button>
          </div>
          {toggle.others && (
            <div className="relative">
              <Input
                className="ps-[40px] text-md mt-4"
                maxLength={3}
                value={tips.rate}
                onChange={handleTipAmtChange}
              />
              <span className="absolute top-[7px] left-[20px] text-md">%</span>
            </div>
          )}
          <div className="my-4">
            <span className="text-[#666666] text-sm">{staticText.tips} </span>
            {/* <span className="text-formColor text-sm cursor-pointer">
              Know more
            </span> */}
          </div>
        </>
      )}
      {/* <Dialog>
        <DialogTrigger asChild>
          <span className="underline py-4 border-t border-b cursor-pointer">
            Have a gift card?
          </span>
        </DialogTrigger>
        <GiftCard />
      </Dialog> */}
      {/* <Drawer>
                <DrawerTrigger asChild>
                    <p className="underline py-4 border-t border-b cursor-pointer">
                        Have a gift card?
                    </p>
                </DrawerTrigger>
                <GiftCard />
            </Drawer> */}
      <div className="flex items-start space-x-2 mt-5">
        <Checkbox
          id="indian"
          className="mt-1"
          defaultChecked
          onCheckedChange={(e) => handleCheckBoxInput(e, "is_indian")}
          value={donorDatas.is_indian}
          disabled
        />
        <div>
          <label
            htmlFor="indian"
            className="text-md font-smeibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            You’re an Indian
          </label>
          <p className="text-[#666666] text-sm">{staticText.living}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentAmount;
