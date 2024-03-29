"use client";

import { toast } from "sonner";

import { createOrgInvite } from "@/actions/create-org-invite";
import { useModal } from "@/hooks/use-modal-store";
import { useAction } from "@/hooks/use-action";

import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { FormInput } from "../form/form-input";
import { FormSubmit } from "../form/form-submit";

export const OrgInviteModal = () => {
    const { onOpen, isOpen, onClose, type, data } = useModal();

    const isModalOpen = isOpen && type === "orgInvite";

    const { execute, fieldErrors } = useAction(createOrgInvite, {
        onSuccess: () => {
            toast.success("Invitation sent!");
            onClose();
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const onSubmit = (formData: FormData) => {
        const email = formData.get("email") as string;

        execute({ email });
    }
    
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        Invite Members
                    </DialogTitle>
                    <DialogDescription>
                        Add team members to your organization.
                    </DialogDescription>
                </DialogHeader>
                <form action={onSubmit} className="space-y-4">
                    <FormInput 
                        id="email"
                        label="Email Address"
                        type="text"
                        errors={fieldErrors}
                    />
                    <DialogFooter>
                        <FormSubmit className="w-full">
                            Send Invitation
                        </FormSubmit>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}