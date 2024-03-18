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
                "fixed flex items-center justify-between bottom-0 w-full p-8 border-t bg-background",
                step === 1 && "justify-end"
            )}
        >
            {step > 1 && 
                <Button
                    variant="ghost"
                    onClick={() => void previousStep()}
                    disabled={step === 1}
                >
                    Previous
                </Button>
            }
            <Button
                onClick={() => void nextStep()}
                disabled={step === 4}
            >
                {step === onboardSteps.length ? "Finish" : "Next"}
            </Button>
        </div>
    )
}