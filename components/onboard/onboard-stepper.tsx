"use client";

import { useOnboardStore } from "@/components/providers/onboard-provider";
import { OnboardStepperDot } from "@/components/onboard/onboard-stepper-dot";
import { onboardSteps } from "@/constants/onboard";
import { OnboardStepperSeparator } from "@/components/onboard/onboard-stepper-separator";

export const OnboardStepper = () => {
    const { selectStep } = useOnboardStore(
        (state) => state,
    );
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const value = parseInt(e.currentTarget.value);
        selectStep(value);
    };
    
    return (
        <div className="flex flex-row items-center justify-between w-full z-0">
            {onboardSteps.map((stepNumber, index) => (
                index !== onboardSteps.length - 1 ? (
                    <>
                        <OnboardStepperDot key={index} stepNumber={stepNumber} handleClick={handleClick}/>
                        <OnboardStepperSeparator key={index} stepNumber={stepNumber}/>
                    </>
                ) : (
                        <OnboardStepperDot key={index} stepNumber={stepNumber} handleClick={handleClick}/>
                )
            ))}
        </div>
    )
}