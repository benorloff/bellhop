"use client";

import { useOnboardStore } from "@/hooks/use-onboarding-store";
import { OnboardingStepper } from "./_components/onboarding-stepper";
import { Button } from "@/components/ui/button";

const OnboardingPage = () => {
    const { onPrevious, onNext, step } = useOnboardStore();
    return (
        <div className="flex flex-col items-center justify-center border rounded-md p-8 space-y-4 min-w-[500px]">
            <OnboardingStepper />
            <div className="text-3xl">Onboarding</div>
            {step === 1 && (<div>Step 1</div>)}
            {step === 2 && (<div>Step 2</div>)}
            {step === 3 && (<div>Step 3</div>)}
            {step === 4 && (<div>Step 4</div>)}
            <Button
                onClick={() => onPrevious()}
                disabled={step === 1}
            >
                Previous
            </Button>
            <Button
                onClick={() => onNext()}
                disabled={step === 4}
            >
                Next
            </Button>
        </div>
    )
};

export default OnboardingPage;