"use client"

import { Logo } from "../logo";
import { useOnboardStore } from "../providers/onboard-provider";
import { Button } from "../ui/button"
import { OnboardStepper } from "./onboard-stepper";

export const OnboardHeader = () => {
    const { step, nextStep, previousStep } = useOnboardStore(
        (state) => state,
    );

    return (
        <div className="fixed flex items-center justify-between top-0 w-full p-8 border-b">
            <Logo />
            <OnboardStepper />
        </div>
    )
}