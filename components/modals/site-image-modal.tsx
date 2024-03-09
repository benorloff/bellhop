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
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod";
import { UpdateSite } from "@/actions/update-site/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";


export const SiteImageModal = () => {
    const { onOpen, isOpen, onClose, type, data } = useModal();

    const router = useRouter();
    const isModalOpen = isOpen && type === "siteImage";

    const form = useForm<z.infer<typeof UpdateSite>>({
        resolver: zodResolver(UpdateSite),
        defaultValues: {
            siteId: "",
            imageUrl: "",
        }
    })
    
    const { execute, isLoading } = useAction(updateSite, {
        onSuccess: (data) => {
            toast.success("Site image updated!");
            onClose();
            router.refresh();
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const onSubmit = (values: z.infer<typeof UpdateSite>) => {
        console.log(values, "values")
        const siteId = data.siteId as string;
        const imageUrl = values.imageUrl;

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
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        <FileUpload 
                                            endpoint="siteImage"
                                            onChange={field.onChange}
                                            value={field.value}
                                        />
                                    </FormControl>
                                    <FormDescription>Recommended size: 300 x 200.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">
                                {isLoading 
                                    ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                                    : "Submit"
                                }
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
};