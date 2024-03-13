"use client";

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useOnboardStore } from "@/hooks/use-onboard-store";
import { cn } from "@/lib/utils";

export const OnboardStepper = () => {
    const { onNext, onPrevious, step } = useOnboardStore();
    
    return (
        <div className="flex flex-row items-center justify-between w-full z-0">
                <Button 
                    variant={step <= 1 ? "secondary" : "default"}
                    className={cn(
                        "h-10 w-10 rounded-full z-10 transition-all duration-500 ease-in-out",
                        step === 1 && "border-2 border-foreground"
                    )}
                >
                    1
                </Button>
                <Separator className={cn(
                    "h-2 flex-1",
                    step > 1 ? "bg-primary" : "bg-secondary"
                )}/>
                <Button 
                    variant={step <= 2 ? "secondary" : "default"} 
                    className={cn(
                        "h-10 w-10 rounded-full z-10 transition-colors duration-500 ease-in-out",
                        step === 2 && "border-2 border-foreground"
                    )}
                >
                    2
                </Button>
                <Separator className={cn(
                    "h-2 flex-1",
                    step > 2 ? "bg-primary" : "bg-secondary"
                )}/>
                <Button 
                    variant={step <= 3 ? "secondary" : "default"}  
                    className={cn(
                        "h-10 w-10 rounded-full z-10 transition-all duration-500 ease-in-out",
                        step === 3 && "border-2 border-foreground"
                    )}
                >
                    3
                </Button>
                <Separator className={cn(
                    "h-2 flex-1",
                    step > 3 ? "bg-primary" : "bg-secondary"
                )}/>
                <Button 
                    variant={step <= 4 ? "secondary" : "default"}   
                    className={cn(
                        "h-10 w-10 rounded-full z-10 transition-all duration-500 ease-in-out",
                        step === 4 && "border-2 border-foreground"
                    )}
                >
                    4
                </Button>
        </div>
    )
}