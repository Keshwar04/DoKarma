import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { staticText } from "@/helper/staticText";
import { Info } from "lucide-react";
import { useFormStore } from "@/store/zustand";
import CheckBoxInput from "@/components/utils/checkBox/checkBoxInput";
import { useEffect } from "react";
import { onBlurValidation } from "@/logics/onBlurFormValidation";
import ErrorLabel from "@/components/utils/errorLabel";
import { CircleAlert } from "lucide-react";

const PersonDetails = ({
  errInfo,
  setErrInfo,
  tempPanErr,
  setTempPanErr,
}: any) => {
  const { donorDatas, setDonorDatas } = useFormStore();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setDonorDatas({ [name]: value });
  };

  const handleBlur = (e: any) => {
    console.log(donorDatas.isAnonymous);

    const { name, value } = e?.target;
    setErrInfo({
      ...errInfo,
      [name]: !value && staticText.requiredField,
    });
    if (name == "panNo") {
      setTempPanErr(value && value.length !== 10 && staticText.panErr);
    }

    const arr = ["mobNo", "email", "pincode"];
    if (arr.includes(name)) {
      onBlurValidation(e, errInfo, setErrInfo);
    }
  };
  const handleCheckBoxInput = (e: any, name: any) =>
    setDonorDatas({ [name]: e });

  useEffect(() => {
    setDonorDatas({ whatsappUpdate: true });
  }, []);
  const isAnonymousDonor = donorDatas.isAnonymous
    ? "Anonymous Donor"
    : donorDatas.name;
  useEffect(() => {
    setDonorDatas({ name: donorDatas.isAnonymous ? "Anonymous Donor" : "" });
  }, [donorDatas.isAnonymous]);

  return (
    <div className="border shadow-sm rounded-xl p-3 sm:p-6 w-full my-10 bg-[#faf9f9]">
      <h1 className="font-semibold text-lg">Your Details</h1>
      <div className="flex flex-col gap-y-3 my-3">
        <div>
          <div className="flex items-center gap-2">
            <Label className="mandotatory">Name of the Donor</Label>
            {errInfo?.name && !donorDatas?.name && (
              <CircleAlert color="red" size="18" />
            )}
          </div>
          <Input
            className="my-2"
            name="name"
            onChange={donorDatas.isAnonymous ? () => {} : handleChange}
            onBlur={handleBlur}
            disabled={donorDatas.isAnonymous}
            value={isAnonymousDonor || ""}
          />
          <CheckBoxInput
            text="Make my donation anonymous"
            handleCheckBox={(e: any) => handleCheckBoxInput(e, "isAnonymous")}
          />
          <Label className="invisible">edeede</Label>
        </div>
        <div>
          <Label className="mandotatory">Mobile Number</Label>
          <Input
            className="mt-2"
            type="number"
            name="mobNo"
            onChange={(e) => e.target.value.length <= 10 && handleChange(e)}
            onBlur={handleBlur}
            value={donorDatas.mobNo || ""}
          />
          <p className="mt-1 text-[#666666] text-sm flex items-center gap-x-1">
            <Info size="14" /> {staticText.paymentMobNo}
          </p>
          <ErrorLabel errData={errInfo.mobNo} />
        </div>
        <div>
          <Label className="mandotatory">Email</Label>
          <Input
            className="mt-2"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={donorDatas?.email || ""}
          />
          <ErrorLabel errData={errInfo.email} />
        </div>
        <div>
          <Label className="mandotatory">Billing Address</Label>
          <Input
            className="mt-2"
            name="address"
            onChange={handleChange}
            onBlur={handleBlur}
            value={donorDatas?.address || ""}
          />
          <ErrorLabel errData={errInfo.address} />
        </div>
        <div>
          <Label className="mandotatory">Pincode</Label>
          <Input
            className="mt-2"
            type="number"
            name="pincode"
            onChange={(e) => e.target.value.length <= 6 && handleChange(e)}
            onBlur={handleBlur}
            value={donorDatas.pincode || ""}
          />
          <p className="mt-1 text-[#666666] text-sm">
            {staticText.pincodeMandatory}
          </p>
          <ErrorLabel errData={errInfo.pincode} />
        </div>
        <div>
          <Label>PAN Number</Label>
          <Input
            className="mt-2"
            name="panNo"
            onChange={(e) => e.target.value.length <= 10 && handleChange(e)}
            onBlur={handleBlur}
            value={donorDatas?.panNo || ""}
          />
          <p className="mt-1 text-[#666666] text-sm">
            {staticText.taxExemption}
          </p>
          <div className="pb-5 border-b">
            <ErrorLabel errData={tempPanErr} />
          </div>
        </div>
      </div>
      <CheckBoxInput
        text={staticText.whatsappUpdate}
        handleCheckBox={(e: any) => handleCheckBoxInput(e, "whatsappUpdate")}
        isDefaultChecked={true}
      />
    </div>
  );
};

export default PersonDetails;
