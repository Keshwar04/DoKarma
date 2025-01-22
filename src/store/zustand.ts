// import { CreateCampaign } from "@/types/campaign";
import { create } from "zustand";

export const useFormStore = create((set: any) => ({
  favData: {} as any,
  setFavData: (data: any) => set({ favData: data }),
  // campaignDatas: {} as CreateCampaign,
  campaignDatas: {} as any,
  setCampaignDatas: (data: any) =>
    set((state: any) => ({
      campaignDatas: { ...state.campaignDatas, ...data },
    })),

  onBoardingDatas: {} as any,
  setOnBoardingDatas: (data: any) =>
    set((state: any) => ({
      onBoardingDatas: { ...state.onBoardingDatas, ...data },
    })),

  donorDatas: {} as any,
  setDonorDatas: (data: any) =>
    set((state: any) => ({ donorDatas: { ...state.donorDatas, ...data } })),

  profileDatas: {} as any,
  setProfileDatas: (data: any) =>
    set((state: any) => ({ profileDatas: { ...state.profileDatas, ...data } })),
}));

export const useMenuStore = create((set: any) => ({
  profileMenu: "Settings",
  setProfileMenu: (data: any) => set({ profileMenu: data }),
}));

export const useCommonStore = create((set: any) => ({
  imgSeed: "",
  setImgSeed: (data: any) => set({ imgSeed: data }),

  trust_id: localStorage.getItem("trust_id") || "",

  accessToken: localStorage.getItem("accessToken") || "",
  setAccessToken: (token: any) => {
    set({ accessToken: token });
    localStorage.setItem("accessToken", token);
  },
  innerWidth: window.innerWidth,
  setInnerWidth: (data: any) => set({ innerWidth: data }),
}));

export const useFormErrorStore = create((set: any) => ({
  onboardingErrorInfo: {} as any,
  setOnboardingErrInfo: (data: any) =>
    set((state: any) => ({
      onboardingErrorInfo: { ...state.onboardingErrorInfo, ...data },
    })),
}));

// export const
