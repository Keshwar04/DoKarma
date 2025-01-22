import { staticText } from "@/helper/staticText";
import Header from "@/components/utils/text/header";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { majorActivities } from "@/helper/selectingList";
import ComboBox from "@/components/utils/comboBox";
import { useFormErrorStore, useFormStore } from "@/store/zustand";
import ErrorLabel from "@/components/utils/errorLabel";

const TrustAndFoundation = ({ handleChange, handleBlur, userData }: any) => {
  const { onBoardingDatas, setOnBoardingDatas } = useFormStore();
  const { onboardingErrorInfo } = useFormErrorStore();
  const isFormSubmittedUser = Object.keys(userData).length > 0;
  return (
    <>
      <div className="-ms-2">
        <Header txt={staticText.onboarding} isMandatory={true} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 mb-6">
        <div>
          <Label>
            Name of the Trust
            <span className="text-xs"> (As per PAN)</span>
          </Label>
          <Input
            className="mt-2"
            name="trust_name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={userData.trust_name || onBoardingDatas?.trust_name || ""}
            disabled={isFormSubmittedUser}
          />
          <ErrorLabel errData={onboardingErrorInfo.trust_name} />
        </div>
        <div>
          <Label>
            Brand Name
            <span className="text-xs">
              {" "}
              (If operating under any other name)
            </span>
          </Label>
          <Input
            className="mt-2"
            name="brand_name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={userData.brand_name || onBoardingDatas?.brand_name || ""}
            disabled={isFormSubmittedUser}
          />
          <ErrorLabel errData={onboardingErrorInfo.brand_name} />
        </div>
        <div>
          <Label>Major Activity of the Trust</Label>
          <div className="mt-2">
            <ComboBox
              selectList={majorActivities}
              placeholder="Activities"
              setState={setOnBoardingDatas}
              isDefaultValue={userData.activity}
              stateKey="activity"
              isDisabled={isFormSubmittedUser}
            />
            <div
              className={`${onBoardingDatas.activity ? "hidden" : "inline"}`}
            >
              <ErrorLabel errData={onboardingErrorInfo.activity} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrustAndFoundation;
