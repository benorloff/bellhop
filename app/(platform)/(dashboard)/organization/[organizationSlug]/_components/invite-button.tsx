"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

export const InviteButton = () => {
    const { onOpen } = useModal();

    return (
        <Button
            onClick={() => onOpen("invite", {})}
        >
            <Plus className="h-4 w-4 mr-2" />
            Invite Members
        </Button> 
    )
};