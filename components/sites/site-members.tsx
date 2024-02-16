"use client";

import { Profile } from "@prisma/client";

import { useModal } from "@/hooks/use-modal-store";

import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage } 
from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface SiteMembersProps {
    profiles: Profile[];
};

export const SiteMembers = ({
    profiles
}: SiteMembersProps) => {
    const { onOpen } = useModal();

    return (
        <>
            {profiles.map((profile) => (
                <Avatar key={profile.id}>
                    <AvatarImage src={profile.imageUrl} alt={profile.firstName} />
                    <AvatarFallback>{profile.firstName[0]}{profile.lastName[0]}</AvatarFallback>
                </Avatar>
            ))}
            <Button
                className="rounded-full w-[40px] h-[40px] p-0"
                onClick={() => onOpen("invite", {})}
            >
                <Plus size={24} />
            </Button>
        </>
    )
};