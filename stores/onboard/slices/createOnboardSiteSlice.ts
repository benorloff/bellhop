import { StateCreator } from "zustand";

export interface OnboardSite {
    name: string;
    url: string;
    imageUrl: string;
};

export type OnboardSiteSlice = {
    siteState: OnboardSite;
    setSiteState: (data: OnboardSite) => void;
};

const initState: OnboardSite = {
    name: "",
    url: "",
    imageUrl: "",
}

export const createOnboardSiteSlice: StateCreator<OnboardSiteSlice> = (set) => ({
    siteState: initState,
    setSiteState: (data) => 
        set((state) => ({ siteState: { ...state.siteState, ...data }}))
});



