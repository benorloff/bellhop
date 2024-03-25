"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { AuditLog } from "@prisma/client";

export const ActivityDetailButton = ({
activity
}: {activity: AuditLog}) => {
    const { onOpen } = useModal();

    return (
        <Button
            variant="ghost"
            onClick={() => onOpen("auditLogDetail",  { auditLog: activity } )}
        >
            <MoreHorizontal size={24} />
        </Button> 
    )
};