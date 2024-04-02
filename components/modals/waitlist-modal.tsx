"use client"

import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { useModal } from "@/hooks/use-modal-store"
import { useAction } from "@/hooks/use-action"
import { createWaitlistSignup } from "@/actions/create-waitlist-signup"
import { toast } from "sonner"
import { useState } from "react"
import { Signup, Waitlist } from "@/actions/create-waitlist-signup/types"
import { Check, Clipboard, Linkedin, Loader2, Mail, MessageCircle, Slack, Twitter, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Separator } from "../ui/separator"
import { Hint } from "../hint"

const WaitlistSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
})

export const WaitlistModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "waitlist";

    const [linkCopied, setLinkCopied] = useState<boolean>(false);
    const [signup, setSignup] = useState<Signup | null>(null);
    const [waitlist, setWaitlist] = useState<Waitlist | null>(null);
    const [isCheckingStatus, setIsCheckingStatus] = useState<boolean>(false);

    const form = useForm<z.infer<typeof WaitlistSchema>>({
        resolver: zodResolver(WaitlistSchema),
        defaultValues: {
            email: "",
        }
    })

    const { execute, isLoading } = useAction(createWaitlistSignup, {
        onSuccess: (data) => {
            form.reset();
            setSignup(data.signup);
            setWaitlist(data.waitlist);
            !isCheckingStatus && toast.success("You've joined the waitlist! 🎉");
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const onSubmit = (values: z.infer<typeof WaitlistSchema>) => {
        const email = values.email;
        execute({ email });
    }

    const handleCopy = () => {
        try {
            navigator.clipboard.writeText(signup?.referral_link!);
            setLinkCopied(true);
            toast.success("Referral link copied to clipboard!", { duration: 3000 });
            setTimeout(() => {
                setLinkCopied(false);
            }, 3000);
        } catch (error) {
            toast.error("Failed to copy referral link to clipboard.");
        }
    }

    const handleCheckStatus = () => {
        setIsCheckingStatus(!isCheckingStatus);
        return;
    }

    const handleShare = ({
        method,
    }: {
        method: "twitter" | "linkedin" | "slack" | "text" | "email";
    }) => {
        switch (method) {
            case "twitter":
                window.open("https://twitter.com/intent/tweet?text=" + {/* messageConstructor */}, "_blank")
                break;
            case "linkedin":
                window.open("https://www.linkedin.com/sharing/share-offsite/?url=" + signup?.referral_link + "&summary=" + /* MESSAGE GOES HERE */ + "&source=Waitlist", "_blank")
                break;
            case "text":
                window.open("sms:?body=" + /* MESSAGE GOES HERE */ + " " + signup?.referral_link)
                break;
            case "email":
                window.open("mailto:?body=" + /* MESSAGE GOES HERE */ + "&subject=" + waitlist?.waitlist_name)
                break;
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-4xl">
                        {signup ? "You're In Line!" : isCheckingStatus ? "Check Your Status" : "Get Early Access"}
                    </DialogTitle>
                    <DialogDescription>
                        {!signup && !isCheckingStatus && (
                            "We're working hard to make sure everyone gets access to Bellhop. In order to deliver an amazing experience, we can only let in a limited number of people at a time.
                        )} 
                    </DialogDescription>
                </DialogHeader>
                {!signup ? (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="flex flex-row gap-2 items-end">
                                <div className="flex-1">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="you@getbell.co" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
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
                            <DialogFooter className="text-xs !justify-start text-muted-foreground">
                                {isCheckingStatus ? (
                                    <div>
                                        <p>
                                            Haven't signed up?
                                            <span 
                                                role="button" 
                                                className="text-primary pl-1"
                                                onClick={handleCheckStatus}
                                            >
                                                Join the waitlist.
                                            </span>
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        <p>
                                            Already signed up?
                                            <span 
                                                role="button" 
                                                className="text-primary pl-1"
                                                onClick={handleCheckStatus}
                                            >
                                                Check your status.
                                            </span>
                                        </p>
                                    </div>
                                )}
                            </DialogFooter>
                        </form>
                    </Form>
                ) : (
                    <>
                        <div className="space-y-4">
                            <div className="text-xl">
                                You're number {signup.priority} on the waitlist! 🎉
                            </div>
                            <div>
                                We sent an email to {signup.email} to confirm your spot in line. We'll let you know when it's your turn to join Bellhop.
                            </div>
                            <Separator />
                            <div className="space-y-2">
                                <p>Referral Link</p>
                                <div className="flex flex-row justify-between items-center w-full border rounded-lg">
                                    <div className="px-4 py-2">
                                        {signup.referral_link}
                                    </div>
                                    <Button 
                                        variant="secondary"
                                        className="!rounded-l-none transition-all ease-in-out"
                                        onClick={handleCopy}
                                        disabled={linkCopied}
                                    >
                                        {linkCopied ? <Check /> : <Clipboard />}
                                    </Button>
                                </div>
                            </div>
                            <Separator />
                            <p>Share and refer your friends to move up in line!</p>
                            <div className="flex flex-row gap-2 justify-start items-center">
                                <Hint label="Twitter/X">
                                    <Button size="icon">
                                        <Twitter />
                                    </Button>
                                </Hint>
                                <Hint label="LinkedIn">
                                    <Button size="icon">
                                        <Linkedin />
                                    </Button>
                                </Hint>
                                <Hint label="Text">
                                    <Button size="icon">
                                        <MessageCircle />
                                    </Button>
                                </Hint>
                                <Hint label="Email">
                                    <Button size="icon">
                                        <Mail />
                                    </Button>
                                </Hint>
                            </div>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}