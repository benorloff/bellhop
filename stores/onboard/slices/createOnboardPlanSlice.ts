import { StateCreator } from "zustand";

export interface OnboardPlan {
    name: string;
    price: number;
};

export type OnboardPlanSlice = {
    plan: OnboardPlan;
    setPlan: (data: OnboardPlan) => void;
};

export const planInitState: OnboardPlan = {
    name: "",
    price: 0,
}

export const createOnboardPlanSlice: StateCreator<OnboardPlanSlice> = (set) => ({
    plan: planInitState,
    setPlan: (data) => 
        set((state) => ({ plan: { ...state.plan, ...data }}))
});

export default createOnboardPlanSlice;


