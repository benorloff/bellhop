"use client";

import { Site, Profile } from "@prisma/client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

interface InviteButtonProps {
    site: Site;
    profile: Profile;
};

export const InviteButton = ({
    site,
    profile,
}: InviteButtonProps) => {
    const { onOpen } = useModal();

    return (
        <Button
            onClick={() => onOpen("siteInvite", {site, profile})}
        >
            <Plus className="h-4 w-4 mr-2" />
            Invite Members
        </Button> 
    )
};