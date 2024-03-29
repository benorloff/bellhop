"use client";

import { useRouter } from "next/navigation";

import { z } from "zod";
import { toast } from "sonner";
import { Site } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAction } from "@/hooks/use-action";
import { useModal } from "@/hooks/use-modal-store";
import { createTicket } from "@/actions/create-ticket";

import { 
    Dialog, 
    DialogContent, 
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
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
    siteId: z.string().min(2, {
        message: "Please select a site.",
    }),
    subject: z.string().min(2, {
        message: "Subject must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
    }),
});

export const CreateTicketModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "createTicket";

    const { formState: { errors } } = useForm();

    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            siteId: "",
            subject: "",
            description: ""
        }
    });

    const { execute, isLoading } = useAction(createTicket, {
        onSuccess: () => {
            form.reset();
            toast.success("Ticket created! 🎉");
            router.refresh();
            onClose();
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const onSubmit = (values: z.infer<typeof FormSchema>) => {
        const site = data?.sites?.find((site: Site) => site.id === values.siteId);
        const siteName = site?.name!;
        const siteUrl = site?.url!;
        const subject = values.subject;
        const description = values.description;
        const siteId = values.siteId;


        execute({ subject, description, siteId, siteName, siteUrl });
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        Open a Ticket
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="siteId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Site</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} required>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a site" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {data?.sites?.map((site) => (
                                                <SelectItem key={site.id} value={site.id}>
                                                    {site.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subject</FormLabel>
                                    <FormControl>
                                        <Input placeholder="What can we help with?" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="How can we help?"
                                            rows={10}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">
                                {isLoading 
                                    ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                                    : "Submit Ticket"
                                }
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
};