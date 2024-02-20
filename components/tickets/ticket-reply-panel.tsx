import { CornerRightUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export const TicketReplyPanel = () => {
    return (
        <div className="sticky bottom-0 w-full p-4 rounded-t-sm bg-background border">
            <div className="flex flex-row gap-2">
                <Input
                    type="text"
                    placeholder="Type your reply here"
                />
                <TooltipProvider>
                    <Tooltip delayDuration={50}>
                        <TooltipTrigger asChild>
                            <Button>
                                <CornerRightUp size={24} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="font-semibold text-sm">Send Reply</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
}