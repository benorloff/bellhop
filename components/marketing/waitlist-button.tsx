"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

export const WaitlistButton = () => {
    const { onOpen } = useModal();

    return (
        <Button
            size="sm"
            onClick={() => onOpen("waitlist",  {} )}
        >
            Join the Waitlist
        </Button> 
    )
};