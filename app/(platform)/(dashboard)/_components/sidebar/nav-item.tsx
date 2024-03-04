"use client";

import Link from "next/link";

import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar-store";

import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";

interface NavItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
};

export const NavItem = ({
    icon: Icon,
    label,
    href,
}: NavItemProps) => {

    const { collapsed } = useSidebar((state) => state);

    return (
        <>
        {collapsed && (
            <Hint label={label} side="right" align="start" asChild>
                <Button
                    asChild
                    variant="ghost"
                    className={cn(
                        "w-full h-12",
                        collapsed ? "justify-center" : "justify-start",
                    )}
                >
                    <Link href={href}>
                        <div className="flex items-center gap-x-2">
                            <Icon className={cn(
                                "h-4 w-4",
                                collapsed ? "mr-0" : "mr-2",
                            )} />
                            {!collapsed && (
                                <span>
                                    {label}
                                </span>
                            )}
                        </div>
                    </Link>
                </Button>
            </Hint>
        )}
        {!collapsed && (
            <Button
                asChild
                variant="ghost"
                className="w-full h-12 justify-start"
            >
                <Link href={href}>
                    <div className="flex items-center gap-x-2">
                        <Icon className="h-4 w-4 mr-2" />
                        <span>
                            {label}
                        </span>
                    </div>
                </Link>
            </Button>
        )}  
        </>
    )


}