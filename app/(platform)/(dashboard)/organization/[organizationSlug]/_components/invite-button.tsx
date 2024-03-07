"use client";

import { Site } from "@prisma/client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

interface InviteButtonProps {
    siteId: string;
    siteName: string;
};

export const InviteButton = ({
    siteId,
    siteName,
}: InviteButtonProps) => {
    const { onOpen } = useModal();

    return (
        <Button
            onClick={() => onOpen("siteInvite", {siteId, siteName})}
        >
            <Plus className="h-4 w-4 mr-2" />
            Invite Members
        </Button> 
    )
};