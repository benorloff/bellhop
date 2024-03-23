import { StateCreator } from "zustand";

export interface OnboardSite {
    name: string;
    url: string;
    imageUrl: string;
};

export type OnboardSiteSlice = {
    site: OnboardSite;
    setSite: (data: OnboardSite) => void;
};

export const siteInitState: OnboardSite = {
    name: "",
    url: "",
    imageUrl: "",
}

export const createOnboardSiteSlice: StateCreator<OnboardSiteSlice> = (set) => ({
    site: siteInitState,
    setSite: (data) => 
        set((state) => ({ site: { ...state.site, ...data }}))
});

export default createOnboardSiteSlice;


