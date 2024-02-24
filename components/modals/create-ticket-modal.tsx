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
import { FormLabel } from "../ui/form";


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

        const site = data.sites?.find((site: any) => site.id === formData.get("siteId"));




        const subject = formData.get("subject") as string;
        const description = formData.get("description") as string;
        const siteId = site?.id as string;
        const siteName = site?.name as string;
        const siteUrl = site?.url as string;

        execute({ subject, description, siteId, siteName, siteUrl});
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
                    <Select
                        name="siteId"
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a site" />
                        </SelectTrigger>
                        <SelectContent>
                            {data.sites?.map((site) => (
                                <SelectItem key={site.id} value={site.id}>
                                    {site.name}
                                </SelectItem>
                            
                            ))}
                        </SelectContent>
                    </Select>
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