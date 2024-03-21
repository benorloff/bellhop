import { create } from "zustand";

export interface OnboardState {
    step: {
        number: number;
        title: string;
        description: string;
    }
    user: {
        firstName: string;
        lastName: string;
        email: string;
        imageUrl: string;
    }
    org: {
        name: string;
        imageUrl: string;
    }
    site: {
        name: string;
        url: string;
        imageUrl: string;
    }
    plan: {
        name: string;
        price: number;
    }

}

export interface OnboardActions {
    updateUserFirstName: (value: string) => void;
    updateUserLastName: (value: string) => void;
    updateUserEmail: (value: string) => void;
    updateUserImageUrl: (value: string) => void;
    updateOrgName: (value: string) => void;
    updateOrgImageUrl: (value: string) => void;
    updateSiteName: (value: string) => void;
    updateSiteUrl: (value: string) => void;
    updateSiteImageUrl: (value: string) => void;
    updatePlanName: (value: string) => void;
    updatePlanPrice: (value: number) => void;
    nextStep: () => void;
    previousStep: () => void;
    selectStep: (value: number) => void;
}

export type OnboardStore = OnboardState & OnboardActions;

export const initOnboardStore = (): OnboardState => {
    return {
        step: {
            number: 1,
            title: "",
            description: "",
        },
        user: {
            firstName: "",
            lastName: "",
            email: "",
            imageUrl: "",
        },
        org: {
            name: "",
            imageUrl: "",
        },
        site: {
            name: "",
            url: "",
            imageUrl: "",
        },
        plan: {
            name: "",
            price: 0,
        }
    }
}

export const defaultInitState: OnboardState = {
    step: {
        number: 1,
        title: "",
        description: "",
    },
    user: {
        firstName: "",
        lastName: "",
        email: "",
        imageUrl: "",
    },
    org: {
        name: "",
        imageUrl: "",
    },
    site: {
        name: "",
        url: "",
        imageUrl: "",
    },
    plan: {
        name: "",
        price: 0,
    }
}

// TODO: Persist store to local storage
// https://docs.pmnd.rs/zustand/integrations/persisting-store-data
export const createOnboardStore = (
    initState: OnboardState = defaultInitState,
) => {
    return create<OnboardStore>((set) => ({
        ...initState,
        updateUserFirstName: (value) => set((state) => ({ 
            user: { 
                ...state.user,
                firstName: value 
            }
        })),
        updateUserLastName: (value) => set((state) => ({ 
            user: { 
                ...state.user,
                lastName: value 
            }
        })),
        updateUserEmail: (value) => set((state) => ({ 
            user: { 
                ...state.user,
                email: value 
            }
        })),
        updateUserImageUrl: (value) => set((state) => ({ 
            user: { 
                ...state.user,
                imageUrl: value 
            }
        })),
        updateOrgName: (value) => set((state) => ({ 
            org: { 
                ...state.org,
                name: value 
            }
        })),
        updateOrgImageUrl: (value) => set((state) => ({ 
            org: { 
                ...state.org,
                imageUrl: value 
            }
        })),
        updateSiteName: (value) => set((state) => ({ 
            site: { 
                ...state.site,
                name: value 
            }
        })),
        updateSiteUrl: (value) => set((state) => ({ 
            site: { 
                ...state.site,
                url: value 
            }
        })),
        updateSiteImageUrl: (value) => set((state) => ({ 
            site: { 
                ...state.site,
                imageUrl: value 
            }
        })),
        updatePlanName: (value) => set((state) => ({ 
            plan: { 
                ...state.plan,
                name: value 
            }
        })),
        updatePlanPrice: (value) => set((state) => ({ 
            plan: { 
                ...state.plan,
                price: value 
            }
        })),
        nextStep: () => set((state) => ({ 
            step: { 
                ...state.step,
                number: state.step.number + 1,
             } 
        })),
        previousStep: () => set((state) => ({ 
            step: { 
                ...state.step,
                number: state.step.number - 1,
             } 
        })),
        selectStep: (value) => set((state) => ({ 
            step: { 
                ...state.step,
                number: value 
            }
        })),
    }))
}