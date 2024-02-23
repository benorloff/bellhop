"use client";

import { useRouter } from "next/navigation";

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
import { useAction } from "@/hooks/use-action";
import { createTicket } from "@/actions/create-ticket";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";


export const CreateTicketModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === "createTicket";

    const { execute, fieldErrors } = useAction(createTicket, {
        onSuccess: () => {
            toast.success("Ticket created! 🎉");
            router.refresh();
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
                    <Select
                        name="type"
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="question">Question</SelectItem>
                            <SelectItem value="incident">Incident</SelectItem>
                            <SelectItem value="problem">Problem</SelectItem>
                            <SelectItem value="task">Task</SelectItem>
                        </SelectContent>
                    </Select>
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