import { Site } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "createTicket" | "orgInvite" | "siteImage" | "siteInvite";

interface ModalData {
    site?: Site;
    sites?: Site[];
    siteId?: string;
    profileId?: string;
    orgMembers?: Array<object>;
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false }),
}))