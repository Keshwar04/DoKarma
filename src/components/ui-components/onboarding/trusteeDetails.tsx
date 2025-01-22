import Header from "@/components/utils/text/header";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { staticText } from "@/helper/staticText";
import { useFormErrorStore, useFormStore } from "@/store/zustand";
import DatePickerUI from "@/components/shadUI/datepicker";
import SwitchInput from "@/components/utils/switch/switchInput";
import { Textarea } from "@/components/ui/textarea";
import ErrorLabel from "@/components/utils/errorLabel";
import { useAuthStore } from "@/store/authStore";

const TrusteeDetails = ({
  handleChange,
  handleSwitchInput,
  handleDateChange,
  handleBlur,
  userData,
}: //
any) => {
  const { onBoardingDatas } = useFormStore();
  const { user } = useAuthStore();

  const { onboardingErrorInfo } = useFormErrorStore();
  const isFormSubmittedUser = Object.keys(userData).length > 0;

  return (
    <>
      <div className="-ms-2">
        <Header txt="Trustee Details" isMandatory={true} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 mb-6">
        <div>
          <Label>Name of Trustees</Label>
          <Input
            className="mt-2"
            name="trustee_name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={userData.trustee_name || onBoardingDatas?.trustee_name || ""}
            disabled={isFormSubmittedUser}
          />
          <ErrorLabel errData={onboardingErrorInfo.trustee_name} />
        </div>
        <div>
          <Label>PAN Number</Label>
          <Input
            className="mt-2"
            name="pan"
            maxLength={10}
            onChange={handleChange}
            onBlur={handleBlur}
            value={userData.pan || onBoardingDatas?.pan || ""}
            disabled={isFormSubmittedUser}
          />
          <ErrorLabel errData={onboardingErrorInfo.pan} />
        </div>
        <div>
          <Label>Aadhar Number</Label>
          <Input
            className="mt-2"
            name="aadhar"
            onChange={(e) => e.target.value.length <= 19 && handleChange(e)}
            onBlur={handleBlur}
            value={userData.aadhar || onBoardingDatas?.aadhar || ""}
            disabled={isFormSubmittedUser}
            maxLength={19}
          />
          <ErrorLabel errData={onboardingErrorInfo.aadhar} />
        </div>
        <div>
          <Label>Date of Birth</Label>
          <div className="mt-2">
            <DatePickerUI
              handleDateChange={handleDateChange}
              stateValue={userData.dob || onBoardingDatas?.dob}
              isDisabled={isFormSubmittedUser}
            />
            <div className={`${onBoardingDatas.dob ? "hidden" : "inline"}`}>
              <ErrorLabel errData={onboardingErrorInfo.dob} />
            </div>
          </div>
        </div>
        <div>
          <Label> No of Years of Social Experience</Label>
          <Input
            className="mt-2"
            type="number"
            name="social_exp"
            onChange={(e) => e.target.value.length <= 2 && handleChange(e)}
            onBlur={handleBlur}
            value={userData.social_exp || onBoardingDatas?.social_exp || ""}
            disabled={isFormSubmittedUser}
          />
          <ErrorLabel errData={onboardingErrorInfo.social_exp} />
        </div>
        <div>
          <Label>Occupation</Label>
          <Input
            className="mt-2"
            name="occupation"
            onChange={handleChange}
            onBlur={handleBlur}
            value={userData.occupation || onBoardingDatas?.occupation || ""}
            disabled={isFormSubmittedUser}
          />
          <ErrorLabel errData={onboardingErrorInfo.occupation} />
        </div>
        <div>
          <Label> Mobile Number</Label>
          <Input
            className="mt-2"
            type="number"
            name="mobile_no"
            onChange={(e) => e.target.value.length <= 10 && handleChange(e)}
            onBlur={handleBlur}
            value={userData.mobile_no || onBoardingDatas?.mobile_no || ""}
            disabled={isFormSubmittedUser}
          />
          <ErrorLabel errData={onboardingErrorInfo.mobile_no} />
        </div>
        <div>
          <Label> Email ID</Label>
          <Input
            className="mt-2"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={user?.email}
            // value={userData.email || onBoardingDatas?.email || ""}
            disabled={true}
          />
          <ErrorLabel errData={onboardingErrorInfo.email} />
        </div>
        <div>
          <Label> DIN Number</Label>
          <Input
            className="mt-2"
            type="number"
            name="din_number"
            onChange={(e) => e.target.value.length <= 8 && handleChange(e)}
            onBlur={handleBlur}
            value={userData.din_number || onBoardingDatas?.din_number || ""}
            disabled={isFormSubmittedUser}
          />
          <ErrorLabel errData={onboardingErrorInfo.din_number} />
        </div>
        <div>
          <SwitchInput
            label={staticText.suit}
            id="is_suite"
            handleChange={handleSwitchInput}
            field="switch"
            isDisabled={isFormSubmittedUser}
            defaultValue={
              isFormSubmittedUser ? userData.is_suite : onBoardingDatas.is_suite
            }
          />
          <ErrorLabel errData={onboardingErrorInfo.is_suite} />
        </div>
        {userData.is_suite || onBoardingDatas.is_suite ? (
          <div>
            <Label className="mandotatory">Suit Details</Label>
            <Textarea
              className="mt-2"
              name="suite_details"
              onChange={handleChange}
              onBlur={handleBlur}
              value={
                userData.suite_details || onBoardingDatas?.suite_details || ""
              }
              disabled={isFormSubmittedUser}
            />
            <ErrorLabel errData={onboardingErrorInfo.suite_details} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default TrusteeDetails;
