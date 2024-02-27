"use client";

import Link from "next/link";
import { 
    NavigationMenu, 
    NavigationMenuItem, 
    NavigationMenuLink, 
    NavigationMenuList, 
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/lib/utils";

export const SiteNav = ({
    basePath
}: {
    basePath: string
}) => {
    const segment = useSelectedLayoutSegment();

    const routes: {
        label: string;
        value: string | null;
        href: string;
    }[] = [
        {
            label: "Overview",
            value: null,
            href: `${basePath}/`,
        },
        {
            label: "Tickets",
            value: "tickets",
            href: `${basePath}/tickets`,
        },
        {
            label: "Team",
            value: "team",
            href: `${basePath}/team`,
        },
        {
            label: "Settings",
            value: "settings",
            href: `${basePath}/settings`,
        },
    ]

    return (
        <NavigationMenu className="mb-8">
            <NavigationMenuList>
                {routes.map((route) => (
                    <NavigationMenuItem key={route.label}>
                        <Link href={route.href} legacyBehavior passHref>
                            <NavigationMenuLink 
                                className={cn(
                                    navigationMenuTriggerStyle(),
                                    route.value === segment && "bg-primary/10 text-primary-500",
                                )}
                            >
                                {route.label}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
};