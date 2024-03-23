import { StateCreator } from "zustand";

export interface OnboardStep {
    number: number;
};

export type OnboardStepSlice = {
    step: OnboardStep;
    nextStep: () => void;
    previousStep: () => void;
    setStep: (value: number) => void;
};

export const stepInitState: OnboardStep = {
    number: 1,
}

export const createOnboardStepSlice: StateCreator<OnboardStepSlice> = (set) => ({
    step: stepInitState,
    nextStep: () => 
        set((state) => ({ step: { ...state.step, number: state.step.number + 1 }})),
    previousStep: () =>
        set((state) => ({ step: { ...state.step, number: state.step.number - 1 }})),
    setStep: (value) => 
        set((state) => ({ step: { ...state.step, number: value }}))
});

export default createOnboardStepSlice;


