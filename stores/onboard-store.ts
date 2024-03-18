import { create } from "zustand";
import { currentUser, auth, clerkClient } from "@clerk/nextjs";
import { Organization, User } from "@clerk/backend";
import { redirect } from "next/navigation";

export interface OnboardState {
    step: number;
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
    }
}

export const defaultInitState: OnboardState = {
    step: 1,
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