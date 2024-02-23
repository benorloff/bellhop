import { Plus } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";


export const Navbar = () => {
    return (
        <nav id="top" className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-background flex items-center">
            {/* TODO: Mobile Sidebar */}
            <div className="flex items-center gap-x-4">
                <div className="hidden md:flex">
                    <Logo />
                </div>
            </div>
            <div className="ml-auto flex items-center gap-x-2">
                <OrganizationSwitcher
                    hidePersonal
                    afterCreateOrganizationUrl="/organization/:slug"
                    afterLeaveOrganizationUrl="/select-org"
                    afterSelectOrganizationUrl="/organization/:slug"
                    appearance={{
                        elements: {
                            rootBox: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            },
                        },
                    }}
                />
                <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: {
                                height: 30,
                                width: 30,
                            }
                        }
                    }}
                />
                <ThemeModeToggle />
            </div>
        </nav>
    )
};