"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

import { toast } from "sonner";
import Textarea from "react-textarea-autosize";
import { CornerRightUp, File, Loader2, Paperclip, Plus, Send } from "lucide-react";

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
                    <Hint
                        label="Attach File"
                        side="top"
                    >
                        <Button
                            variant="outline"
                            className="w-[38px] h-[38px] p-2 rounded-full text-muted-foreground"
                        >
                                <Plus size={16} />
                        </Button>
                    </Hint>
                    <div className="w-full">
                        <Textarea
                            ref={textareaRef}
                            value={body}
                            onChange={handleChange}
                            placeholder="Type your reply here..."
                            rows={1}
                            spellCheck={false}
                            disabled={isLoading}
                            className="w-full resize-none bg-transparent border rounded-sm py-2 px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
                        />
                    </div>
                    <Hint
                        label={body ? "Send Reply" : "Need a message to send"}
                        side="top"
                    >
                        <Button
                            type="submit"
                            onClick={onSubmit}
                            disabled={!body || isLoading}
                            className="h-[38px]"
                        >
                            {isLoading
                                ? <Loader2 size={24} className="animate-spin" />
                                : <Send size={24} />
                            }
                        </Button>
                    </Hint>
                </div>
        </div>
    );
}