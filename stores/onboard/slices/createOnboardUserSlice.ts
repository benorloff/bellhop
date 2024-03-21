import { StateCreator } from "zustand";

export interface OnboardUser {
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string;
};

export type OnboardUserSlice = {
    userState: OnboardUser;
    setUserState: (data: OnboardUser) => void;
};

const initState: OnboardUser = {
    firstName: "",
    lastName: "",
    email: "",
    imageUrl: "",
}

export const createOnboardUserSlice: StateCreator<OnboardUserSlice> = (set) => ({
    userState: initState,
    setUserState: (data) => 
        set((state) => ({ userState: { ...state.userState, ...data }}))
});



