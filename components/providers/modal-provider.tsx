"use client";

import { useEffect, useState } from "react";

import { InviteModal } from "@/components/modals/invite-modal";
import { CreateTicketModal } from "@/components/modals/create-ticket-modal";
import { SiteImageModal } from "@/components/modals/site-image-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <InviteModal />
            <CreateTicketModal />
            <SiteImageModal />
        </>
    )
}