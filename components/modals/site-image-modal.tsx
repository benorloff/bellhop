"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useModal } from "@/hooks/use-modal-store";

import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { FileUpload } from "../file-upload";
import { useState } from "react";

const formSchema = z.object({
    imageUrl: z.string(),
});


export const SiteImageModal = () => {
    const { onOpen, isOpen, onClose, type, data } = useModal();

    const [fileUrl, setFileUrl] = useState("");

    const isModalOpen = isOpen && type === "siteImage";

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            imageUrl: "",
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Subject
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Subject"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FileUpload 
                            onChange={fileUrl => setFileUrl(fileUrl!)}
                            value={fileUrl}
                            endpoint="siteImage"
                        />
                        <DialogFooter>
                            <Button 
                                variant="primary"
                                className="w-full"
                            >
                                Submit
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
};