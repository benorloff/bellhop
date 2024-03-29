import { Button } from "@/components/ui/button"
import { useOnboardStore } from "@/components/providers/onboard-provider";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

interface OnboardStepperDotProps {
    stepNumber: number;
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const OnboardStepperDot = ({
    stepNumber,
}: OnboardStepperDotProps) => {

    const { step, selectStep } = useOnboardStore(
        (state) => state,
    );

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const value = parseInt(e.currentTarget.value);
        selectStep(value);
    };

    return (
        <Button 
            variant={stepNumber >= step.number ? "secondary" : "default"}
            className={cn(
                "h-8 w-8 rounded-full z-10 transition-all duration-500 ease-in-out px-2 hover:bg-background-opacity-100",
                stepNumber === step.number && "border-2 border-foreground",

            )}
            value={stepNumber}
            onClick={handleClick}
        >
            {stepNumber < step.number ? <CheckIcon size={16} /> : stepNumber}
        </Button>
    )
};