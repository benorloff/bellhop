"use client";

import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Suspense, SyntheticEvent, use, useEffect, useState } from "react";

export const ImagePreviewModal = () => {
    const { onOpen, isOpen, onClose, type, data } = useModal();

    const isModalOpen = isOpen && type === "imagePreview";

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose} >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        Image Preview
                    </DialogTitle>
                    <DialogDescription>
                        {data.file?.name!}
                    </DialogDescription>
                </DialogHeader>
                <div className="w-full min-h-fit border rounded-sm bg-muted">
                    <div className="relative flex min-h-[300px] items-center justify-center m-8">
                        {/* {loading ? 
                            <Loader2 size={64} className="animate-spin"/>
                            : */}
                            <Image 
                                fill 
                                src={data.file?.url!} 
                                alt={data.file?.name!} 
                                className="object-contain"
                                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"
                                quality={50}
                            />
                        {/* } */}
                    </div>
                    
                </div>
            </DialogContent>
        </Dialog>
    )
};