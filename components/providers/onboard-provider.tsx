"use client"

import { 
    type ReactNode,
    createContext,
    useRef,
    useContext,
} from 'react';
import {type StoreApi, useStore} from 'zustand';

import {
    OnboardStore,
    createOnboardStore,
    initOnboardStore,
} from '@/stores/onboard-store';

export const OnboardStoreContext = createContext<StoreApi<OnboardStore> | null>(null);

export interface OnboardStoreProviderProps {
    children: ReactNode;
}

export const OnboardStoreProvider = ({
    children,
}: OnboardStoreProviderProps) => {
    const storeRef = useRef<StoreApi<OnboardStore>>()
    if (!storeRef.current) {
        storeRef.current = createOnboardStore(initOnboardStore());
    }
    return (
        <OnboardStoreContext.Provider value={storeRef.current}>
            {children}
        </OnboardStoreContext.Provider>
    )
}

export const useOnboardStore = <T,>(
    selector: (store: OnboardStore) => T,
): T => {
    const onboardStoreContext = useContext(OnboardStoreContext);

    if (!onboardStoreContext) {
        throw new Error('useOnboardStore must be used within a OnboardStoreProvider');
    }

    return useStore(onboardStoreContext, selector);
}