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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

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

    const siteId = data?.siteId!;
    const siteName = data?.siteName!;

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
        }
    });
    
    const { execute, isLoading } = useAction(createSiteInvite, {
        onSuccess: () => {
            form.reset();
            toast.success("Invitation sent!");
            router.refresh();
            onClose();
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const onSubmit = (values: z.infer<typeof FormSchema>) => {
        const email = values.email;

        execute({ email, siteId, siteName });
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
                                        <Input 
                                            placeholder="bella@bellhop.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button 
                                type="submit" 
                                disabled={isLoading}
                            >
                                {isLoading 
                                    ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                                    : "Send Invite"
                                }
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>

        </Dialog>
    )
}