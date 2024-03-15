import { Button } from "@/components/ui/button"
import { useOnboardStore } from "@/components/providers/onboard-provider";
import { cn } from "@/lib/utils";
import { onboardSteps } from "@/constants/onboard";
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
            variant={stepNumber >= step ? "secondary" : "default"}
            className={cn(
                "h-10 w-10 rounded-full z-10 transition-all duration-500 ease-in-out px-2",
                stepNumber === step && "border-2 border-foreground bg-gradient-to-r from-pink-500 to-purple-500",

            )}
            value={stepNumber}
            onClick={handleClick}
        >
            {stepNumber < step ? <CheckIcon size={16} /> : stepNumber}
        </Button>
    )
};