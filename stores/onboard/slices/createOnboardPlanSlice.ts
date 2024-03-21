import { StateCreator } from "zustand";

export interface OnboardPlan {
    name: string;
    price: number;
};

export type OnboardPlanSlice = {
    planState: OnboardPlan;
    setPlanState: (data: OnboardPlan) => void;
};

const initState: OnboardPlan = {
    name: "",
    price: 0,
}

export const createOnboardPlanSlice: StateCreator<OnboardPlanSlice> = (set) => ({
    planState: initState,
    setPlanState: (data) => 
        set((state) => ({ planState: { ...state.planState, ...data }}))
});



