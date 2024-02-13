"use client";

import { createTicket } from "@/actions/create-ticket";
import { useAction } from "@/hooks/use-action";
import { useModal } from "@/hooks/use-modal-store";
import { Dialog } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";

export const CreateTicketModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === "createTicket";

    const { execute, fieldErrors } = useAction(createTicket, {
        onSuccess: (data) => {
            toast.success("Ticket submitted!");
            router.push(`/tickets/${data.id}`)
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const onSubmit = (formData: FormData) => {
        const name = "Test name";
        const email = "benjamin.orloff@gmail.com";
        const subject = formData.get("subject") as string;
        const type = "Bug";
        const status = 2;
        const priority = 2;
        const description = formData.get("description") as string;
        const source = 2;

        execute({ 
            name, 
            email, 
            subject, 
            type, 
            status, 
            priority, 
            description,
            source,
        });
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-black">
                <DialogHeader>
                    <DialogTitle>
                        Open a new ticket
                    </DialogTitle>
                </DialogHeader>
                <form action={onSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <FormInput 
                            id="subject"
                            label="Subject"
                            type="text"
                            errors={fieldErrors}
                        />
                        <FormInput 
                            id="description"
                            label="Description"
                            type="text"
                            errors={fieldErrors}
                        />
                        <FormSubmit className="w-full">
                            Submit
                        </FormSubmit>
                    </div>
                    <DialogFooter>
                        asdf
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )

};