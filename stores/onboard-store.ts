import { create } from "zustand";

export interface OnboardState {
    step: number;
    title: string;
    description: string;
}

export interface OnboardActions {
    nextStep: () => void;
    previousStep: () => void;
    selectStep: (value: number) => void;
}

export type OnboardStore = OnboardState & OnboardActions;

export const initOnboardStore = (): OnboardState => {
    return {
        step: 1,
        title: "",
        description: "",
    }
}

export const defaultInitState: OnboardState = {
    step: 1,
    title: "",
    description: "",
}

export const createOnboardStore = (
    initState: OnboardState = defaultInitState,
) => {
    return create<OnboardStore>((set) => ({
        ...initState,
        nextStep: () => set((state) => ({ step: state.step + 1 })),
        previousStep: () => set((state) => ({ step: state.step - 1 })),
        selectStep: (value) => set({ step: value }),
    }))
}