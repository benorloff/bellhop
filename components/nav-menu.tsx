"use client";

import { cn } from "@/lib/utils";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { usePathname, useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation";
import Link from "next/link";

interface NavMenuProps {
    basePath: string;
    navItems: {
        label: string;
        path?: string;
    }[];
};

export const NavMenu = ({
    basePath,
    navItems
}: NavMenuProps) => {
    const segment = useSelectedLayoutSegment();

    return (
        <NavigationMenu className="border rounded-lg mb-8 p-1">
            <NavigationMenuList className="rounded-sm">
                {navItems.map((item, index) => (
                    <NavigationMenuItem key={index}>
                        <Link href={`${basePath}/${item.path}`} legacyBehavior passHref>
                            <NavigationMenuLink
                                className={cn(
                                    navigationMenuTriggerStyle(),
                                    item.path === (segment || "") && "bg-primary/10 text-primary-500",
                                )}
                            >
                                {item.label}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
};