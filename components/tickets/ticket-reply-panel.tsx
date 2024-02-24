"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import { toast } from "sonner";
import Textarea from "react-textarea-autosize";
import { CornerRightUp } from "lucide-react";

import { useAction } from "@/hooks/use-action";
import { createComment } from "@/actions/create-comment";

import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { useRouter } from "next/navigation";

export const TicketReplyPanel = () => {

    const router = useRouter();

    const [body, setBody] = useState("");

    const { ticketId } = useParams();
    
    const { execute, fieldErrors } = useAction(createComment, {
        onSuccess: () => {
            setBody("");
            toast.success("Reply sent! 🎉");
            router.refresh();
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(e.target.value);
    };
    
    const onSubmit = () => {
        const ticket_id = parseInt(ticketId as string);
        execute({ body, ticket_id });
    }; 
    
    return (
        <div className="sticky bottom-0 w-full p-4 rounded-t-sm bg-background border">
                <div className="flex flex-row gap-2 items-start">
                    <Textarea 
                        value={body}
                        onChange={handleChange}
                        placeholder="Type your reply here..."
                        rows={1}
                        spellCheck={false}
                        className="min-h-[40px] w-full resize-none bg-transparent border rounded-sm py-2 px-4 focus-within:outline-none sm:text-sm"
                    />
                    <Hint
                        label={body ? "Send Reply" : "Need a message to send"}
                        side="top"
                    >
                        <Button
                            type="submit"
                            onClick={onSubmit}
                            disabled={!body}
                        >
                            <CornerRightUp size={24} />
                        </Button>
                    </Hint>
                </div>
        </div>
    );
}