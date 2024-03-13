"use client";

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useOnboardStore } from "@/hooks/use-onboarding-store";

export const OnboardingStepper = () => {
    const { onNext, onPrevious, step } = useOnboardStore();
    
    return (
        <div className="flex flex-row items-center justify-between w-full z-0">
                <Button 
                    variant={step === 1 ? "primary" : "secondary"} 
                    className="h-10 w-10 rounded-full z-10"
                >
                    1
                </Button>
                <Separator className="h-2 flex-1"/>
                <Button 
                    variant={step === 2 ? "primary" : "secondary"}
                    className="h-10 w-10 rounded-full z-10"
                >
                    2
                </Button>
                <Separator className="h-2 flex-1"/>
                <Button 
                    variant={step === 3 ? "primary" : "secondary"}
                    className="h-10 w-10 rounded-full z-10"
                >
                    3
                </Button>
                <Separator className="h-2 flex-1"/>
                <Button 
                    variant={step === 4 ? "primary" : "secondary"} 
                    className="h-10 w-10 rounded-full z-10"
                >
                    4
                </Button>
        </div>
    )
}