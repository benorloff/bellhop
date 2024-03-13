import { create } from "zustand";

export interface OnboardStore {
    step: number;
    onNext: () => void;
    onPrevious: () => void;
}

export const useOnboardStore = create<OnboardStore>((set) => ({
    step: 1,
    onNext: () => set((state) => ({ step: state.step + 1 })),
    onPrevious: () => set((state) => ({ step: state.step - 1 })),
}))