"use client";

import { File, Image, X } from "lucide-react";
import { Hint } from "../hint"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/use-modal-store";

interface TicketAttachmentProps {
    name: string;
    url: string;
    onClick?: any;
    onRemove?: any;
} 

export const TicketAttachment = ({
    name, 
    url,
    onClick,
    onRemove,
}: TicketAttachmentProps) => {
    const { onOpen } = useModal();

    return (
        <Button
            variant="outline"
            className={cn(
                "pl-2",
                onRemove && "pr-0",
            )}
            onClick={() => onOpen("imagePreview", { file: { name, url }})}
        >
            {name.split(".").pop() === "pdf" 
                ? <File size={20} className="mr-1" />
                : <Image size={20} className="mr-1" />
            }
            <div>{name}</div>
            {onRemove && (
                <Hint
                    label="Remove File"
                    side="top"
                >
                    <Button
                        variant="destructive"
                        className="h-10 w-10 rounded-none rounded-r-sm top-0 right-0 p-0 ml-2"
                        onClick={onRemove}
                    >
                        <X size={20} />
                    </Button>
                </Hint>
            )}
        </Button>
    )
};