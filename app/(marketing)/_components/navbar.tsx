"use client";

import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { useTheme } from "next-themes";

export const Navbar = () => {
    // Check if the user is authenticated
    const { isSignedIn } = useUser();
    const { theme } = useTheme();
    return (
        <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-background flex items-center">
            <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                <Logo />
                <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                    { isSignedIn ? (
                        <Button size="sm" variant="outline" asChild>
                            <Link href="/dashboard">
                                Dashboard
                            </Link>
                        </Button>
                    ) : (
                        <>
                            <Button size="sm" variant="outline" asChild>
                                <Link href="/sign-in">
                                Login
                                </Link>
                            </Button>
                            <Button size="sm" asChild>
                                <Link href="/sign-up">
                                Get Started
                                </Link>
                            </Button>
                        </>
                    )}
                    <ThemeModeToggle />
                </div>
            </div>
        </div>
    );
};