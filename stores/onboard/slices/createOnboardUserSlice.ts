import { StateCreator } from "zustand";

export interface OnboardUser {
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string;
};

export type OnboardUserSlice = {
    user: OnboardUser;
    setUser: (data: OnboardUser) => void;
};

export const userInitState: OnboardUser = {
    firstName: "",
    lastName: "",
    email: "",
    imageUrl: "",
}

export const createOnboardUserSlice: StateCreator<OnboardUserSlice> = (set) => ({
    user: userInitState,
    setUser: (data) => 
        set((state) => ({ user: { ...state.user, ...data }}))
});

export default createOnboardUserSlice;

