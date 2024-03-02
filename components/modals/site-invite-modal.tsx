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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";

const FormSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address."
    }),
});

export const SiteInviteModal = () => {
    const { onOpen, isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "siteInvite";
    
    const { formState: { errors } } = useForm();

    const router = useRouter();

    const site = data.site;
    const profile = data.profile;

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
        }
    });
    
    const { execute, fieldErrors } = useAction(createSiteInvite, {
        onSuccess: (data) => {
            toast.success("Invitation sent!");
            router.refresh();
            onClose();
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        const email = data.email;

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
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <FormInput
                                            id="email"
                                            type="email"
                                            placeholder="Email"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <FormSubmit className="w-full">
                                Send Invitation
                            </FormSubmit>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>

        </Dialog>
    )
}