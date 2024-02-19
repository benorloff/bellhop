"use client";

import { useState } from "react";

import { toast } from "sonner";

import { useModal } from "@/hooks/use-modal-store";
import { useAction } from "@/hooks/use-action";
import { updateSite } from "@/actions/update-site";

import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";


export const SiteImageModal = () => {
    const { onOpen, isOpen, onClose, type, data } = useModal();

    const [fileUrl, setFileUrl] = useState("");

    const isModalOpen = isOpen && type === "siteImage";

    console.log(data.siteId, '<-- siteId')

    const { execute, fieldErrors } = useAction(updateSite, {
        onSuccess: (data) => {
            toast.success("Site image updated!");
            onClose();
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const onSubmit = () => {
        const siteId = data.siteId as string;
        const imageUrl = fileUrl as string;

        execute({ siteId, imageUrl });
    }

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
                <FileUpload 
                    endpoint="siteImage"
                    onChange={(fileUrl) => setFileUrl(fileUrl!)}
                    value={fileUrl}
                />
                <DialogFooter>
                    { fileUrl ? (
                        <Button 
                            variant="primary"
                            className="w-full"
                            onClick={onSubmit}
                        >
                            Submit
                        </Button>
                    ) : (
                        <Button 
                            variant="primary"
                            className="w-full"
                            disabled
                        >
                            Submit
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};