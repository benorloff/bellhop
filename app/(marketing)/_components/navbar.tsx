"use client";

import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { useTheme } from "next-themes";
import { WaitlistButton } from "@/components/marketing/waitlist-button";

export const Navbar = () => {
    // Check if the user is authenticated
    const { isSignedIn } = useUser();
    const { theme } = useTheme();
    return (
        <div id="header-wrapper" className="fixed w-full z-10">
            <div className="max-w-screen-2xl mx-auto">
                <div id="header-container" className="w-full bg-neutral-100/75 dark:bg-neutral-100/5 backdrop-blur-lg dark:backdrop-brightness-50 px-12">
                    <div id="header-content-wrapper" className="flex flex-1 justify-between items-center py-4">
                        <Logo />
                        <div className="space-x-4 md:block md:w-auto flex items-center justify-end w-full">
                            <WaitlistButton />
                            <ThemeModeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};