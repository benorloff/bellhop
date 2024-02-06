"use client";

import { useModal } from "@/hooks/use-modal-store";
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

export const InviteModal = () => {
    const { onOpen, isOpen, onClose, type, data } = useModal();

    const isModalOpen = isOpen && type === "invite";


    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Invite Members
                    </DialogTitle>
                    <DialogDescription>
                        Add collaborators to your site.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    Invitation form will go here.
                </div>
            </DialogContent>

        </Dialog>
    )
}