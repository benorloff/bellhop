"use client";

import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { useTheme } from "next-themes";

export const Navbar = () => {
    // Check if the user is authenticated
    const { isSignedIn } = useUser();
    const { theme } = useTheme();
    return (
        <div id="header-wrapper" className="fixed w-full z-10 top-4 ">
            <div className="max-w-screen-xl mx-auto bg-neutral-100/75 dark:bg-neutral-100/5 backdrop-blur-lg dark:backdrop-brightness-50 rounded-full">
                <div id="header-container" className="w-full flex-col pl-7 pr-5 flex mx-auto rounded-full">
                    <div id="header-content-wrapper" className="flex flex-1 justify-between items-center py-4">
                        <Logo />
                        <div className="space-x-4 md:block md:w-auto flex items-center justify-end w-full">
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
            </div>
        </div>
    );
};