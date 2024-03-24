"use client"

import { cn } from "@/lib/utils";
import { useOnboardStore } from "../providers/onboard-provider";
import { Button } from "../ui/button"
import { onboardSteps } from "@/constants/onboard";

export const OnboardFooter = () => {
    const { step, nextStep, previousStep } = useOnboardStore(
        (state) => state,
    );

    return (
        <div 
            className={cn(
                "absolute flex items-center justify-between bottom-0 left-0 w-full p-8 border-t bg-background",
                step.number === 1 && "justify-end"
            )}
        >
            {step.number > 1 && 
                <Button
                    variant="ghost"
                    onClick={() => void previousStep()}
                    disabled={step.number === 1}
                >
                    Previous
                </Button>
            }
            <Button
                onClick={() => void nextStep()}
                disabled={step.number === 4}
            >
                {step.number === onboardSteps.length ? "Finish" : "Next"}
            </Button>
        </div>
    )
}