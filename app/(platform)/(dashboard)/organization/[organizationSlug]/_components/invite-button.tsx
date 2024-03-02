"use client";

import { Site, Profile } from "@prisma/client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

interface InviteButtonProps {
    siteId: string;
    profileId: string;
    orgMembers: Array<object>;
};

export const InviteButton = ({
    siteId,
    profileId,
    orgMembers,
}: InviteButtonProps) => {
    const { onOpen } = useModal();

    return (
        <Button
            onClick={() => onOpen("siteInvite", {siteId, profileId, orgMembers})}
        >
            <Plus className="h-4 w-4 mr-2" />
            Invite Members
        </Button> 
    )
};