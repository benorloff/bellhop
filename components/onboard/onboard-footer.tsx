"use client"

import { useOnboardStore } from "../providers/onboard-provider";
import { Button } from "../ui/button"

export const OnboardFooter = () => {
    const { step, nextStep, previousStep } = useOnboardStore(
        (state) => state,
    );

    return (
        <div>
            <Button
                onClick={() => void previousStep()}
                disabled={step === 1}
            >
                Previous
            </Button>
            <Button
                onClick={() => void nextStep()}
                disabled={step === 4}
            >
                Next
            </Button>
        </div>
    )
}