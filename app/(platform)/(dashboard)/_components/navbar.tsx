"use client";

import { Logo } from "@/components/logo";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import { NotificationDropdown } from "@/components/notification-dropdown";


export const Navbar = () => {
    const { theme } = useTheme();
    return (
        <nav id="top" className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-background flex items-center">
            <div className="flex items-center gap-x-4">
                <div className="hidden md:flex">
                    <Logo />
                </div>
            </div>
            <div className="ml-auto flex items-center gap-x-2">
                <OrganizationSwitcher
                    hidePersonal
                    afterCreateOrganizationUrl="/dashboard"
                    afterLeaveOrganizationUrl="/select-org"
                    afterSelectOrganizationUrl="/dashboard"
                    appearance={{
                        elements: {
                            rootBox: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            },
                        },
                        baseTheme: theme === "dark" ? dark : undefined,
                    }}
                />
                <NotificationDropdown />
                <ThemeModeToggle />
                <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: {
                                height: 35,
                                width: 35,
                            },
                            userButtonPopoverCard: {
                                borderRadius: "0.375rem",
                            }
                            
                        },
                        baseTheme: theme === "dark" ? dark : undefined,
                    }}
                />
            </div>
        </nav>
    )
};