"use client";

import { toast } from "sonner";

import { createSiteInvite } from "@/actions/create-site-invite";
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
import { useRouter } from "next/navigation";

export const SiteInviteModal = () => {
    const router = useRouter();
    const { onOpen, isOpen, onClose, type, data } = useModal();

    const isModalOpen = isOpen && type === "siteInvite";

    const { execute, fieldErrors } = useAction(createSiteInvite, {
        onSuccess: (data) => {
            router.refresh();
            toast.success("Invitation sent!");
            onClose();
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const onSubmit = (formData: FormData) => {
        const email = formData.get("email") as string;
        const site = data.site;
        const profile = data.profile;

        execute({ email, site, profile });
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        Invite Site Members
                    </DialogTitle>
                    <DialogDescription>
                        Add collaborators to your site.
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