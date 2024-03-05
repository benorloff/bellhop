"use client";

import { useModal } from "@/hooks/use-modal-store";

import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage } 
from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Hint } from "@/components/hint";
import { Member } from "@prisma/client";

interface SiteMembersProps {
    siteId: string;
    members: Member[];
};

export const SiteMembers = ({
    siteId,
    members,
}: SiteMembersProps) => {
    const { onOpen } = useModal();

    return (
        <>
            {members.map((member) => (
                <Hint
                    side="top"
                    label={member.userName}
                    key={member.userId}
                >
                    <Avatar>
                        <AvatarImage src={member.userImage} alt={member.userName} />
                        <AvatarFallback>{member.userName[0]}</AvatarFallback>
                    </Avatar>
                </Hint>
            ))}
            <Hint
                side="top"
                label="Invite"
            >
                <Button
                    className="rounded-full w-[40px] h-[40px] p-0"
                    onClick={() => onOpen("siteInvite", { siteId })}
                >
                    <Plus size={24} />
                </Button>
            </Hint>
            
        </>
    )
};