import { StateCreator } from "zustand";

export interface OnboardOrg {
    name: string;
    imageUrl: string;
};

export type OnboardOrgSlice = {
    org: OnboardOrg;
    setOrg: (data: OnboardOrg) => void;
};

export const orgInitState: OnboardOrg = {
    name: "",
    imageUrl: "",
}

export const createOnboardOrgSlice: StateCreator<OnboardOrgSlice> = (set) => ({
    org: orgInitState,
    setOrg: (data) => 
        set((state) => ({ org: { ...state.org, ...data }}))
});

export default createOnboardOrgSlice;



