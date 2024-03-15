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
            "h-2 flex-1",
            step > stepNumber ? "bg-primary" : "bg-secondary"
        )}/>
    )
}