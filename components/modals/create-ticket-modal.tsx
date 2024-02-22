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
import { useAction } from "@/hooks/use-action";
import { createTicket } from "@/actions/create-ticket";
import { FormInput } from "../form/form-input";
import { FormSubmit } from "../form/form-submit";
import { revalidatePath } from "next/cache";

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

    // const form = useForm({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: {
    //         name: "",
    //         email: "ben@circle.black",
    //         subject: "",
    //         type: "",
    //         status: 2,
    //         priority: 2,
    //         description: "",
    //         source: 2,
    //         custom_fields: {
    //             cf_site_id: "",
    //         }
    //     }
    // });

    // const onSubmit = async (values: z.infer<typeof formSchema>) => {
    //     try {
    //         console.log(values, "<-- values before sending to API")
    //         const response = await fetch(`${process.env.NEXT_PUBLIC_FRESHDESK_API_URL}`, {
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Basic ${btoa(`${process.env.NEXT_PUBLIC_FRESHDESK_KEY}:x`)}`,
    //             },
    //             body: JSON.stringify(values)
    //         });

    //         if (!response.ok) {
    //             throw new Error('Failed to create ticket');
    //         };

    //         const data = await response.json();

    //         form.reset();
    //         toast.success("Ticket submitted! Taking you to the ticket page...");
    //         router.push(`/tickets/${data.id}`);

    //         onClose();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const { execute, fieldErrors } = useAction(createTicket, {
        onSuccess: (data) => {
            toast.success("Ticket created! Taking you to the ticket page...");
            router.push(`/tickets/${data.id}`);
            onClose();
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const onSubmit = (formData: FormData) => {
        const subject = formData.get("subject") as string;
        const type = formData.get("type") as string;
        const description = formData.get("description") as string;

        execute({ subject, type, description});
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        Open a Ticket
                    </DialogTitle>
                </DialogHeader>
                <form action={onSubmit} className="space-y-4">
                    <FormInput 
                        id="subject"
                        label="Subject"
                        type="text"
                        errors={fieldErrors}
                    />
                    <FormInput 
                        id="type"
                        label="Type"
                        type="text"
                        errors={fieldErrors}
                    />
                    <FormInput 
                        id="description"
                        label="Description"
                        type="text"
                        errors={fieldErrors}
                    />
                    <DialogFooter>
                        <FormSubmit className="w-full">
                            Submit Ticket
                        </FormSubmit>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )

};