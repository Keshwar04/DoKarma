import { Button } from "@/components/ui/button";
import CheckBoxInput from "@/components/utils/checkBox/checkBoxInput";
import { useFormErrorStore, useFormStore } from "@/store/zustand";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { staticText } from "@/helper/staticText";
// import { useState } from "react";
import { signupTrusteeValidation } from "@/logics/validation";
import { useTrusts } from "@/hooks/useTrust";
import ErrorLabel from "@/components/utils/errorLabel";

const SignupAsTrustee = ({ userData }: any) => {
  const { setOnBoardingDatas, onBoardingDatas } = useFormStore();
  const { setOnboardingErrInfo, onboardingErrorInfo } = useFormErrorStore();
  const { addTrust, isLoading, setIsLoading } = useTrusts();
  const isFormSubmittedUser = Object.keys(userData).length > 0;
  const handleCheckBoxInput = (e: any) =>
    setOnBoardingDatas({ terms_and_conditions: e });

  const handleClick = () => {
    const errData = signupTrusteeValidation(onBoardingDatas);
    setOnboardingErrInfo(errData);
    const objKeys = Object.keys(errData).length === 0;

    if (objKeys) {
      setIsLoading(true);
      setTimeout(async () => {
        const res = await addTrust(onBoardingDatas);
        if (res) {
          toast({
            title: staticText.formSubmitted,
            status: "success",
          });
          window.location.reload();
        }
      }, 1200);
    } else {
      toast({
        title: staticText.errMsg,
        status: "error",
      });
    }
  };

  return (
    <div className="flex flex-col gap-y-3">
      {Object.keys(userData).length === 0 && (
        <>
          <div className="flex gap-3">
            <CheckBoxInput
              text="I agree to the"
              id="terms_and_conditions"
              handleCheckBox={handleCheckBoxInput}
              stateValue={onBoardingDatas.terms_and_conditions}
              isDisabled={isFormSubmittedUser}
            />
            <ErrorLabel
              errData={
                !onBoardingDatas.terms_and_conditions &&
                onboardingErrorInfo.terms_and_conditions
              }
            />
          </div>
          <Button
            className="my-2 bg-formColor hover:bg-[#1F4473] w-[250px]"
            disabled={isLoading}
            onClick={handleClick}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              "SIGNUP AS A TRUST"
            )}
          </Button>
        </>
      )}
    </div>
  );
};

export default SignupAsTrustee;
