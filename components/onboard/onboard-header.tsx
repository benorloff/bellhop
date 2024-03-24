"use client"

import { Logo } from "../logo";
import { OnboardStepper } from "./onboard-stepper";

export const OnboardHeader = () => {

    return (
        <nav className="fixed z-50 flex items-center justify-between top-0 w-full h-14 px-4 border-b bg-background/75 backdrop-blur-lg">
            <Logo />
            <OnboardStepper />
        </nav>
    )
}