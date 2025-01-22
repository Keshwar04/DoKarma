import Header from "@/components/utils/text/header";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { staticText } from "@/helper/staticText";
import { useFormErrorStore, useFormStore } from "@/store/zustand";
import { Textarea } from "@/components/ui/textarea";
import SwitchInput from "@/components/utils/switch/switchInput";
import ErrorLabel from "@/components/utils/errorLabel";
import FileSizeType from "@/components/utils/fileSizeType";

const TaxInformation = ({
  fileClass,
  handleChange,
  handleSwitchInput,
  handleBlur,
  userData,
}: any) => {
  const { onBoardingDatas } = useFormStore();
  const { onboardingErrorInfo } = useFormErrorStore();
  const isFormSubmittedUser = Object.keys(userData).length > 0;
  return (
    <>
      <div className="-ms-2 ">
        <Header txt="Tax Information" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 mb-6">
        <div>
          <SwitchInput
            label="Is the Trust FCRA Registered?"
            id="is_fcra"
            handleChange={handleSwitchInput}
            field="switch"
            isDisabled={isFormSubmittedUser}
            defaultValue={
              isFormSubmittedUser ? userData.is_fcra : onBoardingDatas.is_fcra
            }
          />
          <ErrorLabel errData={onboardingErrorInfo.is_fcra} />
        </div>
        {userData.is_fcra || onBoardingDatas.is_fcra ? (
          <>
            <div>
              <Label className="mandotatory">FCRA Registartion Number</Label>
              <Input
                className="mt-2"
                name="fcra_no"
                onChange={handleChange}
                onBlur={handleBlur}
                value={userData.fcra_no || onBoardingDatas?.fcra_no || ""}
                disabled={isFormSubmittedUser}
              />
              <ErrorLabel errData={onboardingErrorInfo.fcra_no} />
            </div>
            <div>
              <Label className="mandotatory">
                Latest annual return filed under FCRA
              </Label>
              <Input
                className={`mt-2 ${fileClass}`}
                type="file"
                name="fcra_annual_return"
                onChange={handleChange}
                onBlur={handleBlur}
                accept=".jpg,.png,.pdf"
                disabled={isFormSubmittedUser}
              />
              <FileSizeType />
              <ErrorLabel errData={onboardingErrorInfo.fcra_annual_return} />
            </div>
            <div>
              <Label className="mandotatory">FCRA Certificate</Label>
              <Input
                className={`mt-2 ${fileClass}`}
                type="file"
                onChange={handleChange}
                onBlur={handleBlur}
                name="fcra_certificate"
                accept=".jpg,.png,.pdf"
                disabled={isFormSubmittedUser}
              />
              <FileSizeType />
              <ErrorLabel errData={onboardingErrorInfo.fcra_certificate} />
            </div>
          </>
        ) : (
          <></>
        )}

        <div>
          <SwitchInput
            label={staticText.fema}
            id="is_incometax_case"
            handleChange={handleSwitchInput}
            field="switch"
            isDisabled={isFormSubmittedUser}
            defaultValue={
              isFormSubmittedUser
                ? userData.is_incometax_case
                : onBoardingDatas.is_incometax_case
            }
          />
          <ErrorLabel errData={onboardingErrorInfo.is_incometax_case} />
        </div>
        {userData.is_incometax_case || onBoardingDatas.is_incometax_case ? (
          <div>
            <Label className="mandotatory">Case Details</Label>
            <Textarea
              className="mt-2"
              name="incometax_case_details"
              onChange={handleChange}
              onBlur={handleBlur}
              value={
                userData.incometax_case_details ||
                onBoardingDatas?.incometax_case_details ||
                ""
              }
              disabled={isFormSubmittedUser}
            />
            <ErrorLabel errData={onboardingErrorInfo.incometax_case_details} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default TaxInformation;
