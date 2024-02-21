"use client";

import Textarea from "react-textarea-autosize";

import { CornerRightUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";

export const TicketReplyPanel = () => {
    return (
        <div className="sticky bottom-0 w-full p-4 rounded-t-sm bg-background border">
            <div className="flex flex-row gap-2 items-start">
                <Textarea 
                    placeholder="Type your reply here..."
                    rows={1}
                    spellCheck={false}
                    className="min-h-[40px] w-full resize-none bg-transparent border rounded-sm py-2 px-4 focus-within:outline-none sm:text-sm"
                />
                <Hint
                    label="Send Reply"
                    side="top"
                >
                    <Button>
                        <CornerRightUp size={24} />
                    </Button>
                </Hint>
            </div>
        </div>
    );
}