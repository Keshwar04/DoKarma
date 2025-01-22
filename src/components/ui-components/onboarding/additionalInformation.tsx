import Header from "@/components/utils/text/header";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormErrorStore, useFormStore } from "@/store/zustand";
import ErrorLabel from "@/components/utils/errorLabel";
import FileSizeType from "@/components/utils/fileSizeType";

const AdditionalInformation = ({
  fileClass,
  handleChange,
  handleBlur,
  userData,
}: any) => {
  const { onBoardingDatas } = useFormStore();
  const { onboardingErrorInfo } = useFormErrorStore();
  const isFormSubmittedUser = Object.keys(userData).length > 0;
  return (
    <>
      <div className="-ms-2 ">
        <Header txt="Additional Information" isMandatory={true} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-4">
        <div>
          <Label>Activity Reports of previous works/ Sample photographs</Label>
          <Input
            className={`mt-2 ${fileClass}`}
            type="file"
            name="activity_reports"
            onChange={handleChange}
            onBlur={handleBlur}
            accept=".jpg,.png,.pdf"
            disabled={isFormSubmittedUser}
          />
          <FileSizeType />
          <ErrorLabel errData={onboardingErrorInfo.activity_reports} />
        </div>
        <div>
          <Label>Google Location of the Trust</Label>
          <Input
            className="mt-2"
            name="google_location"
            onChange={handleChange}
            onBlur={handleBlur}
            value={
              userData.google_location || onBoardingDatas.google_location || ""
            }
            disabled={isFormSubmittedUser}
          />
          <ErrorLabel errData={onboardingErrorInfo.google_location} />
        </div>
        <div>
          <Label>Brief about the Trust</Label>
          <Textarea
            className="mt-2"
            name="about_trust"
            onChange={handleChange}
            onBlur={handleBlur}
            value={userData.about_trust || onBoardingDatas.about_trust || ""}
            disabled={isFormSubmittedUser}
          />
          <ErrorLabel errData={onboardingErrorInfo.about_trust} />
        </div>
      </div>
    </>
  );
};

export default AdditionalInformation;
