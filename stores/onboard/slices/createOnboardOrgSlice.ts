import { StateCreator } from "zustand";

export interface OnboardOrg {
    name: string;
    imageUrl: string;
};

export type OnboardOrgSlice = {
    orgState: OnboardOrg;
    setOrgState: (data: OnboardOrg) => void;
};

const initState: OnboardOrg = {
    name: "",
    imageUrl: "",
}

export const createOnboardOrgSlice: StateCreator<OnboardOrgSlice> = (set) => ({
    orgState: initState,
    setOrgState: (data) => 
        set((state) => ({ orgState: { ...state.orgState, ...data }}))
});



