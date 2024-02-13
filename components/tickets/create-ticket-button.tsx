"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

export const CreateTicketButton = () => {
    const { onOpen } = useModal();

    return (
        <Button
            onClick={() => onOpen("createTicket", {})}
        >
            <Plus className="h-4 w-4 mr-2" />
            New Ticket
        </Button> 
    )
};