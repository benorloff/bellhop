"use client"

import { useState } from "react"

import { toast } from "sonner"

import { useModal } from "@/hooks/use-modal-store"

import { WaitlistForm } from "@/components/marketing/waitlist-form"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Hint } from "@/components/hint"
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle 
} from "@/components/ui/dialog"
import { 
    Check, 
    Clipboard, 
    Linkedin, 
    Mail, 
    MessageCircle, 
    Twitter 
} from "lucide-react"


export const WaitlistModal = () => {

    const [linkCopied, setLinkCopied] = useState<boolean>(false);
    const [isCheckingStatus, setIsCheckingStatus] = useState<boolean>(false);

    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "waitlist";

    const signup = data.signup || undefined;
    const waitlist = data.waitlist || undefined;

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
        setIsCheckingStatus(isCheckingStatus => !isCheckingStatus);
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
                        {signup ? <div>You're In Line!<span className="ml-4">🎉</span></div> : isCheckingStatus ? "Check Your Status" : "Get Early Access"}
                    </DialogTitle>
                    <DialogDescription>
                        {!signup && !isCheckingStatus && (
                            "We're working hard to make sure everyone gets access to Bellhop. In order to deliver an amazing experience, we can only let in a limited number of people at a time."
                        )} 
                    </DialogDescription>
                </DialogHeader>
                {!signup ? (
                    <>
                        <WaitlistForm 
                            showFieldLabels={true} 
                            isCheckingStatus={isCheckingStatus} 
                        />
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
                    </>
                ) : (
                    <>
                        <div className="space-y-4">
                            <div className="text-xl">
                                You're number {signup.priority} on the waitlist!
                            </div>
                            <div className="text-muted-foreground">
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