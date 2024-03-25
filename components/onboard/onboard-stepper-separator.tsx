import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { useOnboardStore } from "../providers/onboard-provider";

interface OnboardStepperSeparatorProps {
    stepNumber: number;
}

export const OnboardStepperSeparator = ({
    stepNumber,
}: OnboardStepperSeparatorProps) => {
    const { step } = useOnboardStore(
        (state) => state,
    );
    return (
        <Separator className={cn(
            "h-1 flex-1 scale-x-110",
            step.number > stepNumber ? "bg-primary" : "bg-secondary"
        )}/>
    )
}