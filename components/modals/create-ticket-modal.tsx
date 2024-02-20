"use client";

import { useRouter } from "next/navigation";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useModal } from "@/hooks/use-modal-store";
import { 
    Dialog, 
    DialogContent, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle 
} from "@/components/ui/dialog";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "This does not appear to be a valid email address",
    }).email({
        message: "Invalid email address"
    }),
    subject: z.string({
        required_error: "Subject is required",
        invalid_type_error: "Subject must be a string",
    }),
    // Should we create ticket type enums?
    type: z.string({
        required_error: "Type is required",
        invalid_type_error: "Type must be a string",
    }),
    // 2 - Open, 3 - Pending, 4 - Resolved, 5 - Closed
    status: z.number({
        required_error: "Status is required",
        invalid_type_error: "Status must be a number",
    }).int({
        message: "Status must be an integer"
    }).gte(2, {
        message: "Status must be at least 2"
    }).lte(5, {
        message: "Status must be at most 5"
    }),
    // 1 - Low, 2 - Medium, 3 - High, 4 - Urgent
    priority: z.number({
        required_error: "Priority is required",
        invalid_type_error: "Priority must be a number",
    }).int({
        message: "Priority must be an integer"
    }).gte(1, {
        message: "Priority must be at least 1"
    }).lte(4, {
        message: "Priority must be at most 4"
    }),
    description: z.string({
        required_error: "Description is required",
        invalid_type_error: "Description must be a string",
    }),
    // 1 - Email, 2 - Portal, 3 - Phone, 7 - Chat, 9 - Feedback Widget, 10 - Outbound Email
    source: z.number({
        required_error: "Source is required",
        invalid_type_error: "Source must be a number",
    }).int({
        message: "Source must be an integer"
    }),
    // TODO: Custom Fields for user_id, org_id, and site_id
    // See https://support.freshdesk.com/en/support/solutions/articles/216548
});

export const CreateTicketModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === "createTicket";

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "benjamin.orloff@gmail.com",
            subject: "",
            type: "",
            status: 2,
            priority: 2,
            description: "",
            source: 2,
            custom_fields: {
                cf_site_id: "",
            }
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log(values, "<-- values before sending to API")
            const response = await fetch(`${process.env.NEXT_PUBLIC_FRESHDESK_API_URL}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${process.env.NEXT_PUBLIC_FRESHDESK_KEY}:x`)}`,
                },
                body: JSON.stringify(values)
            });

            if (!response.ok) {
                throw new Error('Failed to create ticket');
            };

            const data = await response.json();

            form.reset();
            toast.success("Ticket submitted! Taking you to the ticket page...");
            router.push(`/tickets/${data.id}`);

            onClose();
        } catch (error) {
            console.log(error);
        }
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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="subject"
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
                        <FormField
                            control={form.control}
                            name="custom_fields.cf_site_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Choose a site...
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choose a site..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem key="1" value="1">Site 1</SelectItem>
                                            <SelectItem key="2" value="2">Site 2</SelectItem>
                                            <SelectItem key="3" value="3">Site 3</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem
                                >
                                    <FormLabel>
                                        What do you need help with?
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choose a help category..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem key="1" value="Bug">Bug</SelectItem>
                                            <SelectItem key="2" value="Feature Request">Feature Request</SelectItem>
                                            <SelectItem key="3" value="Question">Question</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        How can we help?
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Write up a short description of the problem..."
                                            className="h-[200px] resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button 
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