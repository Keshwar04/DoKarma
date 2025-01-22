/**
 * Settings component for DoKarma user profile
 *
 * Features:
 * - Personal information form (name, email, location, gender)
 * - Avatar selection and customization
 * - Banner image upload using react-dropzone
 * - Preview card showing user profile summary
 * - Responsive layout for various screen sizes
 *
 * Uses:
 * - React hooks (useState, useCallback)
 * - Custom UI components (Button, Input, Label, SelectUI, Radio)
 * - react-dropzone for file uploads
 * - CSS modules for styling
 *
 * State management:
 * - Handles form data, file uploads, and avatar selection
 * - Updates user info on save
 *
 * TODO: Implement actual data persistence and API integration
 */

import { useEffect, useState } from "react";
import styles from "@/css/profile.module.css";
import RandomImage from "./randomImage";
import PersonalInfoForm1 from "./personalInfoForm1";
import PersonalInfoForm2 from "./personalInfoForm2";
// import BannerImage from './bannerImage';
// import UploadBannerImage from './uploadBannerImage';
import { staticText } from "@/helper/staticText";
import Header from "@/components/utils/text/header";
import { useCommonStore, useFormStore } from "@/store/zustand";
import { useAuthStore } from "@/store/authStore";
// import { mandatoryFormValidation } from '@/logics/logics';
// import { profileKeys } from '@/helper/formKeys';
// import { toast } from "@/hooks/use-toast";
// import { regex } from '@/helper/regex';
import { onBlurValidation } from "@/logics/onBlurFormValidation";
import { useTrusts } from "@/hooks/useTrust";
// import { settingsValidation } from "@/logics/validation";

interface UserData {
  name: string;
  email: string;
  location: string;
  gender: string;
}

const Settings = () => {
  const [userDatas, setUserDatas] = useState<UserData>({
    name: "",
    email: "",
    location: "",
    gender: "",
  });
  const { profile, fetchProfile, updateProfile } = useAuthStore();
  const { profileDatas, setProfileDatas } = useFormStore();
  // const [files, setFiles] = useState<any>([]);
  // const [userInfo, setUserInfo] = useState<any>({})
  const [errInfo, setErrInfo] = useState<any>({});
  const [crntImage, setCrntImage] = useState<any>("Vivian");
  const { setImgSeed } = useCommonStore();
  const { userData, getOnboardingDetails } = useTrusts();
  // const handleChange = (e: any) => {
  //   const { name, value } = e?.target;
  //   setProfileDatas({ [name]: value });
  // };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | string,
    key?: string
  ) => {
    if (key === "radio") {
      setUserDatas((prev) => ({ ...prev, gender: e as string }));
    } else if (typeof e !== "string") {
      const { name, value } = e.target;
      setUserDatas((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBlur = (e: any) => {
    const { name, value } = e?.target;
    setErrInfo({
      ...errInfo,
      [name]: !value && staticText.requiredField,
    });
    const arr = ["panNo", "mobNo", "email"];
    if (arr.includes(name)) {
      onBlurValidation(e, errInfo, setErrInfo);
    }
  };

  // const handleClick = () => {
  //   const errData = settingsValidation(profileDatas);
  //   setErrInfo(errData);
  //   const objKeys = Object.keys(errData).length === 0;
  //   objKeys && setImgSeed(crntImage);
  //   toast({
  //     title: objKeys ? staticText.successMsg : staticText.errMsg,
  //     status: objKeys ? "success" : "error",
  //   });
  //   // setUserInfo({ ...profileDatas, bannerImg: files[0]?.preview })
  //   // setFiles([])
  //   // setProfileDatas({ name: '', email: '', location: '', gender: '' })
  //   // const isMandatoryFields = mandatoryFormValidation(profileDatas, profileKeys)
  //   // const isValidFields = validFormats()
  //   // const isFormValid = isMandatoryFields && isValidFields
  //   // isFormValid && setImgSeed(crntImage)

  //   // toast({
  //   //     title: isFormValid ? staticText.successMsg : staticText.errMsg,
  //   //     status: isFormValid ? 'success' : 'error'
  //   // })
  // };

  const handleClick = async () => {
    const updatedData = {
      username: userDatas.name,
      avatar_url: crntImage,
    };

    const success = await updateProfile(updatedData);

    if (success) {
      setUserDatas({
        name: "",
        email: "",
        location: "",
        gender: "",
      });
      setImgSeed(crntImage);
    }
  };

  // const validFormats = () => {
  //     const { email, panNo, mobNo } = profileDatas;
  //     const isAllFieldsValid = {
  //         mail: email ? regex.mail.test(email) : false,
  //         panNo: panNo?.length === 10,
  //         mobNo: mobNo?.length === 10,
  //     };
  //     return Object.values(isAllFieldsValid).every(Boolean)
  // };

  useEffect(() => {
    if (profileDatas.name) {
      setProfileDatas({ donationName: profileDatas.name });
    }
  }, [profileDatas.name]);

  useEffect(() => {
    fetchProfile();
    getOnboardingDetails(localStorage.getItem("accessToken") || "");
  }, []);

  useEffect(() => {
    if (profile) {
      setUserDatas({
        name: profile.username || "",
        email: profile.email || "",
        location: userDatas.location, // Keep existing value if any
        gender: userDatas.gender, // Keep existing value if any
      });
      if (profile.avatar_url) {
        setCrntImage(profile.avatar_url);
      }
    }
  }, [profile]);

  return (
    <>
      <div className="grid grid-cols-12  py-3">
        <div className="col-span-12 sm:col-span-8">
          <div className={styles.info}>
            <Header txt="Personal Info" />
            <p className="mt-2">{staticText.updateInfo}</p>
          </div>
        </div>
        <div
          className="col-span-12 sm:col-span-4 mt-2 sm:mt-0 
                    flex sm:justify-end items-center"
        >
          <div className={styles.button} />
        </div>
      </div>
      <div className="grid grid-cols-12  py-3 gap-x-4 md:gap-x-9">
        <div className="col-span-12 md:col-span-2">
          <RandomImage
            handleClick={handleClick}
            setCrntImage={setCrntImage}
            crntImage={crntImage}
            profile={profile}
          />
        </div>
        <div className="col-span-12 md:col-span-10 grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 sm:mt-0">
          <PersonalInfoForm1
            handleChange={handleChange}
            handleBlur={handleBlur}
            errInfo={errInfo}
            userDatas={userDatas}
            onboarduser={userData}
          />
          <PersonalInfoForm2
            handleChange={handleChange}
            handleBlur={handleBlur}
            errInfo={errInfo}
            userDatas={userDatas}
            onboarduser={userData}
          />
        </div>
      </div>

      {/* <div className='grid grid-cols-12  py-3 gap-x-9'>
                <div className='col-span-7'>
                    <UploadBannerImage />
                </div>
                <div className='col-span-5'>
                    <BannerImage userInfo={userInfo} />
                </div>
            </div> */}
    </>
  );
};

export default Settings;
