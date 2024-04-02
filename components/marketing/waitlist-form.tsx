"use client"

import { useEffect } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Loader2 } from "lucide-react"

import { createWaitlistSignup } from "@/actions/create-waitlist-signup"
import { useModal } from "@/hooks/use-modal-store"
import { useAction } from "@/hooks/use-action"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form"

const WaitlistSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
})

export interface WaitlistFormProps {
    isCheckingStatus?: boolean;
    showFieldLabels?: boolean;
}

export const WaitlistForm = ({
    isCheckingStatus,
    showFieldLabels,
}: WaitlistFormProps) => {

    const { onOpen } = useModal();

    const form = useForm<z.infer<typeof WaitlistSchema>>({
        resolver: zodResolver(WaitlistSchema),
        defaultValues: {
            email: "",
        }
    })

    const { execute, isLoading } = useAction(createWaitlistSignup, {
        onSuccess: (data) => {
            onOpen("waitlist", {
                signup: data.signup,
                waitlist: data.waitlist,
            });
            form.reset();
            !isCheckingStatus && toast.success("You've joined the waitlist! 🎉");
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    let referral_link: string = "";

    useEffect(() => {
        const url = new URL(window.location.href);
        referral_link = url.href;
    })

    const onSubmit = (values: z.infer<typeof WaitlistSchema>) => {
        const email = values.email;
        execute({ email, referral_link });
    }

    return (
        <div className="relative z-5 w-full">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4">
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="!text-left">
                                    {showFieldLabels && (
                                        <FormLabel>Email</FormLabel>
                                    )}
                                    <div className="flex flex-row gap-2 items-center">
                                        <FormControl>
                                            <Input placeholder="you@getbell.co" {...field} />
                                        </FormControl>
                                        <Button 
                                            type="submit"
                                            disabled={isLoading}
                                            className="relative"
                                        >
                                            <span
                                                className={cn(
                                                    isLoading ? "opacity-0" : "opacity-100",
                                                )}
                                            >
                                                {!isCheckingStatus ? "Join the Waitlist" : "Check Status"}
                                            </span>
                                            {isLoading 
                                                && <Loader2 className="absolute mx-auto h-4 w-4 animate-spin" /> 
                                            }
                                        </Button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
            </form>
        </Form>
        </div>
    )
}