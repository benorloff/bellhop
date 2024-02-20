import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip";

interface HintProps {
    label: string;
    children: React.ReactNode;
    asChild?: boolean;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
};

export const Hint = ({
    label,
    children,
    asChild,
    side,
    align,
}: HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild={asChild}>
                    {children}
                </TooltipTrigger>
                <TooltipContent
                    className="bg-background"
                    side={side}
                    align={align}
                >
                    <p className="font-semibold">
                        {label}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};