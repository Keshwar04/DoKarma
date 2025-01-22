import DatePickerUI from "@/components/shadUI/datepicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import Radio from "@/components/shadUI/radioInput";
import { useFormStore } from "@/store/zustand";
// import { gender } from "@/helper/radioList";
import ErrorLabel from "@/components/utils/errorLabel";
const PersonalInfoForm2 = ({
  handleChange,
  handleBlur,
  errInfo,
  // userDatas,
  onboarduser,
}: any) => {
  const { profileDatas, setProfileDatas } = useFormStore();
  const handleDateChange = (e: Date, key: string) =>
    setProfileDatas({ [key]: e });
  // const handleRadioChange = (e: any) => setProfileDatas({ gender: e });
  return (
    <>
      <div>
        <Label className="mandotatory">Mail ID</Label>
        <Input
          className="mt-2"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled
          value={onboarduser?.email || ""}
        />
        <ErrorLabel errData={errInfo.email} />
      </div>
      <div>
        <Label className="mandotatory">Date of Birth</Label>
        <div className="mt-2">
          <DatePickerUI
            handleDateChange={(eve: any) => handleDateChange(eve, "dob")}
            isDisabled={true}
            stateValue={onboarduser?.dob}
          />
          <div className={profileDatas.dob ? "hidden" : "block"}>
            <ErrorLabel errData={errInfo.dob} />
          </div>
        </div>
      </div>
      {/* <div>
        <Label>Anniversary Date</Label>
        <div className="mt-2">
          <DatePickerUI
            handleDateChange={(eve: any) =>
              handleDateChange(eve, "annniversaryDate")
            }
            stateValue={profileDatas?.annniversaryDate}
          />
        </div>
      </div>
      <div>
        <Label>Gender</Label>
        <div className="mt-3">
          <Radio
            handleChange={handleRadioChange}
            radioList={gender}
            genderValue={profileDatas?.gender || ""}
          />
        </div>
      </div> */}
    </>
  );
};

export default PersonalInfoForm2;
