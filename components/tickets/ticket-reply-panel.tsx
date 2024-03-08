"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

import { toast } from "sonner";
import Textarea from "react-textarea-autosize";
import { CornerRightUp, Loader2 } from "lucide-react";

import { useAction } from "@/hooks/use-action";
import { createComment } from "@/actions/create-comment";

import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { useRouter } from "next/navigation";

export const TicketReplyPanel = () => {

    const router = useRouter();
    const [body, setBody] = useState("");
    const { ticketId } = useParams();
    
    // Handle the server action status
    const { execute, isLoading } = useAction(createComment, {
        onSuccess: () => {
            setBody("");
            toast.success("Reply sent! 🎉");
            router.refresh();
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    // Handle user input
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(e.target.value);
    };
    
    // Submit the form data to the server action
    const onSubmit = () => {
        const ticket_id = parseInt(ticketId as string);
        execute({ body, ticket_id });
    }; 

    // Allow user to submit with Command + Enter
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const textareaElement = textareaRef.current;

    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                onSubmit();
            };
        };
        if (textareaElement) {
            textareaElement.addEventListener("keydown", listener);
        }
        return () => {
            if (textareaElement) {
                textareaElement.removeEventListener("keydown", listener);
            }
        };
    }, [textareaElement, onSubmit]);
    
    return (
        <div className="sticky bottom-0 w-full p-4 rounded-t-sm bg-background border">
                <div className="flex flex-row gap-2 items-start">
                    <Textarea
                        ref={textareaRef}
                        value={body}
                        onChange={handleChange}
                        placeholder="Type your reply here..."
                        rows={1}
                        spellCheck={false}
                        disabled={isLoading}
                        className="min-h-[40px] w-full resize-none bg-transparent border rounded-sm py-2 px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
                    />
                    <Hint
                        label={body ? "Send Reply" : "Need a message to send"}
                        side="top"
                    >
                        <Button
                            type="submit"
                            onClick={onSubmit}
                            disabled={!body || isLoading}
                        >
                            {isLoading
                                ? <Loader2 size={24} className="animate-spin" />
                                : <CornerRightUp size={24} />
                            }
                        </Button>
                    </Hint>
                </div>
        </div>
    );
}