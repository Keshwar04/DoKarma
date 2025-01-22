import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ErrorLabel from "@/components/utils/errorLabel";
// import ComboBox from "@/components/utils/comboBox";
// import { cities } from "@/helper/selectingList";
// import { useTrusts } from "@/hooks/useTrust";
// import { useFormStore } from "@/store/zustand";
// import { useEffect } from "react";

const PersonalInfoForm1 = ({
  handleChange,
  handleBlur,
  errInfo,
  // userDatas,
  onboarduser,
}: any) => {
  // const { profileDatas, setProfileDatas } = useFormStore();

  return (
    <>
      <div>
        <Label className="mandotatory">Name of the Donor</Label>
        <Input
          className="mt-2"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          disabled
          // value={userDatas?.name || ""}
          value={onboarduser.trust_name}
        />
        <ErrorLabel errData={errInfo.name} />
      </div>
      <div>
        <Label className="mandotatory">Donation In the Name of</Label>
        <Input
          className="mt-2"
          disabled
          // value={userDatas?.name || ""}
          value={onboarduser.trust_name}
        />
        <ErrorLabel errData={errInfo.name} />
      </div>
      <div>
        <Label className="mandotatory">Location</Label>
        <Input
          className="mt-2"
          name="panNo"
          maxLength={10}
          onChange={handleChange}
          disabled
          onBlur={handleBlur}
          value={onboarduser?.google_location || ""}
        />
        {/* <div className="mt-2">
          <ComboBox
            selectList={cities}
            placeholder="City"
            setState={setProfileDatas}
            stateKey="location"
          />
          <div className={profileDatas.location ? "hidden" : "block"}>
            <ErrorLabel errData={errInfo.location} />
          </div>
        </div> */}
      </div>
      <div>
        <Label className="mandotatory">PAN Number</Label>
        <Input
          className="mt-2"
          name="panNo"
          maxLength={10}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled
          value={onboarduser?.pan || ""}
        />
        <ErrorLabel errData={errInfo.panNo} />
      </div>
      <div>
        <Label className="mandotatory">Mobile Number</Label>
        <Input
          className="mt-2"
          name="mobNo"
          type="number"
          onChange={(e) => e.target.value.length <= 10 && handleChange(e)}
          onBlur={handleBlur}
          disabled
          value={onboarduser?.mobile_no || ""}
        />
        <ErrorLabel errData={errInfo.mobNo} />
      </div>
    </>
  );
};

export default PersonalInfoForm1;
