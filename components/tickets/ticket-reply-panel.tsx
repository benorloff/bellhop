"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

import { toast } from "sonner";
import Textarea from "react-textarea-autosize";
import { CornerRightUp, File, Image, Loader2, Paperclip, Plus, Send, X } from "lucide-react";

import { useAction } from "@/hooks/use-action";
import { createComment } from "@/actions/create-comment";

import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { useRouter } from "next/navigation";
import { UploadButton } from "@/lib/uploadthing";
import { CreateComment } from "@/actions/create-comment/schema";
import { Badge } from "../ui/badge";
import { TicketAttachment } from "./ticket-attachment";
import { cn } from "@/lib/utils";

interface FileProps {
    name: string;
    size: number;
    key: string;
    serverData?: any;
    url: string;
}

interface TicketReplyPanelProps {
    ticketStatus: "new" | "open" | "pending" | "hold" | "solved" | "closed";
}

export const TicketReplyPanel = ({
    ticketStatus,
}: TicketReplyPanelProps) => {

    const router = useRouter();
    const [body, setBody] = useState("");
    const [file, setFile] = useState<FileProps>();
    const { ticketId } = useParams();
    const parsedFile = {
        name: "",
        extension: "",
    }
    
    // Handle the server action status
    const { execute, isLoading } = useAction(createComment, {
        onSuccess: () => {
            setBody("");
            setFile(undefined);
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
        execute({ body, ticket_id, file });
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

    useEffect(() => {
        console.log(file, "<-- files");
    }, [file]);
    
    return (
        <div className="sticky bottom-0 w-full p-4 rounded-t-sm bg-background border">
                <div className="flex flex-row gap-2 items-start">
                    {/* If ticket is closed, don't render the file upload button. */}
                    {ticketStatus !== "closed" && (
                        <Hint
                            label="Attach File"
                            side="top"
                        >
                            <UploadButton
                                endpoint="ticketFile"
                                onClientUploadComplete={(res) => {
                                    setFile(res[0]);
                                    toast.success("File uploaded!");
                                }}
                                onUploadError={(error) => {
                                    toast.error("Error uploading file.");
                                }}
                                appearance={{
                                    container: "h-[38px]",
                                    button: "w-12 bg-background hover:bg-accent text-foreground hover:text-accent-foreground border rounded-sm p-1 focus-within:ring-transparent disabled:opacity-50 sm:text-sm",
                                    allowedContent: "hidden",
                                }}
                                content={{
                                    button({ ready, isUploading }) {
                                        if (!ready || isUploading) return <Loader2 size={24} className="animate-spin z-50"/>;
                                        if (ready) return <Plus size={24}/>;
                                    },
                                }}
                            />
                        </Hint>
                    )}
                    <div className="w-full space-y-2">
                        <div>
                            <Textarea
                                ref={textareaRef}
                                value={body}
                                onChange={handleChange}
                                placeholder={ ticketStatus === "closed" ? "This ticket is closed and cannot accept new replies." : "Type your reply here..."}
                                rows={1}
                                spellCheck={false}
                                disabled={ ticketStatus === "closed" || isLoading}
                                className="w-full resize-none bg-transparent border rounded-sm py-2 px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
                            />
                        </div>
                        {file && (
                            <TicketAttachment
                                name={file.name}
                                url={file.url}
                                onRemove={() => setFile(undefined)}
                                // TODO: Add file preview modal
                                // onClick={() => onOpen("filePreview", { file })}
                            />
                        )}
                    </div>
                    <Hint
                        label={ticketStatus === "closed" ? "Ticket closed" : body ? "Send Reply" : "Need a message to send"}
                        side="top"
                    >
                        <Button
                            type="submit"
                            onClick={onSubmit}
                            disabled={!body || isLoading}
                            className="h-[38px] rounded-sm"
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