"use client";

import { usePathname, useRouter } from "next/navigation";
import { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar-store";
import Link from "next/link";

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
    const router = useRouter();
    const pathname = usePathname();

    const { collapsed } = useSidebar((state) => state);

    // We should move these routes to Sidebar and map through nav items there

    const onClick = (href: string) => {
        router.push(href);
    };

    return (
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
                        collapsed ? "mr-0" : "mr-2"
                    )} />
                    {!collapsed && (
                        <span>
                            {label}
                        </span>
                    )}
                </div>
            </Link>
        </Button>
    )


}