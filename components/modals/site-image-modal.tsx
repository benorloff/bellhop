"use client";

import { useModal } from "@/hooks/use-modal-store";
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

export const SiteImageModal = () => {
    const { onOpen, isOpen, onClose, type, data } = useModal();

    const isModalOpen = isOpen && type === "siteImage";

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        Upload Site Image
                    </DialogTitle>
                    <DialogDescription>
                        Add an image to your site.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    Upload dropzone will go here.
                </div>
            </DialogContent>

        </Dialog>
    )
};