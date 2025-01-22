import { useFormErrorStore, useFormStore } from "@/store/zustand";
// import Layout from "./layout";
import TrustAndFoundation from "@/components/ui-components/onboarding/trustAndFoundation";
import TrusteeDetails from "@/components/ui-components/onboarding/trusteeDetails";
import DocumentsUpload from "@/components/ui-components/onboarding/documentsUpload";
import TaxInformation from "@/components/ui-components/onboarding/taxInformation";
import AdditionalInformation from "@/components/ui-components/onboarding/additionalInformation";
import SignupAsTrustee from "@/components/ui-components/onboarding/signupAsTrustee";
import { handlingFileInput } from "@/logics/logics";
import { useEffect } from "react";
import { staticText } from "@/helper/staticText";
import { onBlurValidation2 } from "@/logics/onBlurFormValidation";
import { useCampaigns } from "@/hooks/useCampaign";
import { toast } from "@/hooks/use-toast";
// import Header from "../header";
import { useTrusts } from "@/hooks/useTrust";
import AlertUI from "@/components/utils/alertUI";
import { useAuthStore } from "@/store/authStore";
// import { regex } from "@/helper/regex"
// import { toast } from "@/hooks/use-toast"
// import { staticText } from "@/helper/staticText"

const OnBoarding = () => {
  const { setOnBoardingDatas, onBoardingDatas } = useFormStore();
  const { onboardingErrorInfo, setOnboardingErrInfo } = useFormErrorStore();
  const { uploadImage } = useCampaigns();
  const { userData, getOnboardingDetails } = useTrusts();
  const { user } = useAuthStore();
  const isFormSubmitted = Object.keys(userData).length > 0;
  const token = localStorage.getItem("accessToken") || "";

  const handleChange = async (e: any) => {
    const { files, type, name, value } = e.target;

    if (name === "aadhar") {
      const input = value.replace(/\D+/g, ""); // Allow only numeric characters
      const formattedInput = input.match(/.{1,4}/g)?.join(" ") || input;
      setOnBoardingDatas({ [name]: formattedInput });
    } else if (type === "file" && files[0]) {
      handlingFileInput(e, files[0]);
      if (files[0]) {
        const publicUrl = await uploadImage(files[0] as File);
        if (publicUrl) {
          setOnBoardingDatas({ [name]: publicUrl });
        } else {
          toast({
            title: staticText.errMsg,
            status: "error",
          });
        }
      }
    } else {
      setOnBoardingDatas({ [name]: value });
    }
  };

  const handleBlur = (e: any) => {
    const { name, value } = e.target;
    setOnboardingErrInfo({
      [name]: !value && staticText.requiredField,
    });
    const arr = ["pan", "mobile_no", "din_number", "aadhar", "email"];
    if (arr.includes(name)) {
      onBlurValidation2(e, onboardingErrorInfo, setOnboardingErrInfo);
    }
  };

  const handleSwitchInput = (e: any, key: any) =>
    setOnBoardingDatas({ [key]: e });

  const handleDateChange = (e: Date) => setOnBoardingDatas({ dob: e });

  useEffect(() => {
    setOnBoardingDatas({
      ...onBoardingDatas,
      suite_details: onBoardingDatas?.is_suite
        ? onBoardingDatas.suite_details
        : "",

      fcra_no: onBoardingDatas?.is_fcra ? onBoardingDatas.fcra_no : "",
      fcra_annual_return: onBoardingDatas?.is_fcra
        ? onBoardingDatas.fcra_annual_return
        : "",
      fcra_certificate: onBoardingDatas?.is_fcra
        ? onBoardingDatas.fcra_certificate
        : "",
      incometax_case_details: onBoardingDatas?.is_incometax_case
        ? onBoardingDatas.incometax_case_details
        : "",
    });
  }, [
    onBoardingDatas?.is_suite,
    onBoardingDatas?.is_fcra,
    onBoardingDatas?.is_incometax_case,
  ]);

  useEffect(() => {
    setOnBoardingDatas({ email: user?.email });
    getOnboardingDetails(token);
  }, []);

  const fileClass = `file:bg-formColor file:text-white`;

  return (
    <div className="mt-[25px] mb-6">
      {isFormSubmitted && (
        <AlertUI
          title={staticText.submitted}
          description={staticText.approval}
        />
      )}

      <div className="min-h-screen overflow-y-auto scrollbarHide p-6 border shadow-md rounded-md">
        <TrustAndFoundation
          handleChange={handleChange}
          handleBlur={handleBlur}
          userData={userData}
        />

        <TrusteeDetails
          handleChange={handleChange}
          handleSwitchInput={handleSwitchInput}
          handleDateChange={handleDateChange}
          handleBlur={handleBlur}
          userData={userData}
        />

        <DocumentsUpload
          handleChange={handleChange}
          fileClass={fileClass}
          handleBlur={handleBlur}
          userData={userData}
          handleSwitchInput={handleSwitchInput}
        />

        <TaxInformation
          handleChange={handleChange}
          fileClass={fileClass}
          handleSwitchInput={handleSwitchInput}
          handleBlur={handleBlur}
          userData={userData}
        />

        <AdditionalInformation
          handleChange={handleChange}
          fileClass={fileClass}
          handleBlur={handleBlur}
          userData={userData}
        />

        <SignupAsTrustee userData={userData} />
      </div>
    </div>
  );
};

export default OnBoarding;
