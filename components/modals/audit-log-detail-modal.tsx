"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

export const AuditLogDetailModal = () => {
    const { onOpen, isOpen, onClose, type, data } = useModal();

    const isModalOpen = isOpen && type === "auditLogDetail";

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose} >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        Audit Log
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <div className="text-muted-foreground">Log ID</div>
                        <div>{data.auditLog?.id}</div>
                    </div>
                    <Separator />
                    <div className="flex flex-row justify-between items-start gap-4">
                        <div>
                            <div className="text-muted-foreground">Entity Type</div>
                            <div>{data.auditLog?.entityType.toLowerCase()}</div>
                        </div>
                        <div>
                            <div className="text-muted-foreground">Entity ID</div>
                            <div>{data.auditLog?.entityId}</div>
                        </div>
                        <div>
                            <div className="text-muted-foreground">Event</div>
                            <div>
                                {`${data.auditLog?.entityType.toLowerCase()}.${data.auditLog?.action.toLowerCase()}d`}
                            </div>
                        </div>
                    </div>
                    <Separator />
                    <div>
                        <div className="text-muted-foreground">When</div>
                        <div>{data.auditLog?.createdAt.toString()}</div>
                    </div>
                    <Separator />
                    <div>
                        <div className="text-muted-foreground">By</div>
                        <div>{data.auditLog?.userName}</div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
};