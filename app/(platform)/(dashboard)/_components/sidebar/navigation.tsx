"use client";

import {
    Layout,
    Laptop,
    Tag,
} from "lucide-react";

import { NavItem } from "./nav-item";

export const Navigation = () => {

    const routes = [
        {
            label: "Dashboard",
            icon: Layout,
            href: "/dashboard",
        },
        {
            label: "Sites",
            icon: Laptop,
            href: "/sites",
        },
        {
            label: "Tickets",
            icon: Tag,
            href: "/tickets",
        },
    ];
    
    return (
        <ul className="space-y-2 px-2 pt-4 lg:pt-0">
            {routes.map((route) => (
                <NavItem
                    key={route.href}
                    label={route.label}
                    icon={route.icon}
                    href={route.href}
                />
            ))}
        </ul>
    )
}