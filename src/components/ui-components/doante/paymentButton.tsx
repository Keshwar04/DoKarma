import { Button } from "@/components/ui/button";
// import { donorKeys } from "@/helper/formKeys";
// import { mandatoryFormValidation } from "@/logics/logics";
import { staticText } from "@/helper/staticText";
import { useFormStore } from "@/store/zustand";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { donorValidation } from "@/logics/validation";

const PaymentButton = ({ width, totalAmount, setErrInfo }: any) => {
  const { donorDatas } = useFormStore();

  const handleClick = () => {
    const errData = donorValidation(donorDatas);
    setErrInfo(errData);
    const objKeys = Object.keys(errData).length === 0;
    let isValidPan;
    if (!donorDatas.panNo) isValidPan = true;
    else if (donorDatas.panNo && donorDatas.panNo?.length === 10)
      isValidPan = true;
    else isValidPan = false;
    toast({
      title: objKeys && isValidPan ? staticText.successMsg : staticText.errMsg,
      status: objKeys && isValidPan ? "success" : "error",
    });
    // const isMandatoryFields = mandatoryFormValidation(donorDatas, donorKeys)
    // const isValidFields = validFormats()
    // const isFormValid = isMandatoryFields && isValidFields
    // toast({
    //   title: isFormValid ? staticText.successMsg : staticText.errMsg,
    //   status: isFormValid ? 'success' : 'error'
    // })
  };
  // const validFormats = () => {
  //   const { mobNo, email, pincode } = donorDatas;
  //   const isAllFieldsValid = {
  //     mail: email ? regex.mail.test(email) : false,
  //     mobNo: mobNo?.length === 10,
  //     pincode: pincode?.length === 6
  //   };
  //   return Object.values(isAllFieldsValid).every(Boolean)
  // }
  return (
    <div className="mb-5">
      <Button
        size="lg"
        className={`bg-pimaryBtn hover:bg-primaryClr 
      text-black text-md font-medium ${width}`}
        onClick={handleClick}
      >
        Proceed to pay ₹{totalAmount}&nbsp; <ArrowRight size="18" />
      </Button>
      <div className="flex items-center gap-2 mt-2">
        <LockKeyhole size="16" />
        <p className=" text-[#666666] text-sm">{staticText.securePayment}</p>
      </div>
    </div>
  );
};

export default PaymentButton;
