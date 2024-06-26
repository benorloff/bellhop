import { Signup, Waitlist } from "@/actions/create-waitlist-signup/types";
import { AuditLog, Site } from "@prisma/client";
import { create } from "zustand";

export type ModalType = 
    | "createTicket" 
    | "orgInvite" 
    | "siteImage" 
    | "siteInvite" 
    | "imagePreview"
    | "auditLogDetail"
    | "waitlist"

interface ModalData {
    site?: Site;
    sites?: Site[];
    siteId?: string;
    siteName?: string;
    profileId?: string;
    orgMembers?: Array<object>;
    file?: {
        name: string,
        url: string,
    };
    auditLog?: AuditLog;
    email?: string;
    signup?: Signup;
    waitlist?: Waitlist;
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