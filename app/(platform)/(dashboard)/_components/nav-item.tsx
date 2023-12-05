"use client";

import { usePathname, useRouter } from "next/navigation";
import { 
    Layout,
    Laptop,
    Tag
 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const NavItem = () => {
    const router = useRouter();
    const pathname = usePathname();

    // We should move these routes to Sidebar and map through nav items there

    const routes = [
        {
            label: "Dashboard",
            icon: <Layout className="h-4 w-4 mr-2" />,
            href: "/",
        },
        {
            label: "Sites",
            icon: <Laptop className="h-4 w-4 mr-2" />,
            href: "/sites",
        },
        {
            label: "Tickets",
            icon: <Tag className="h-4 w-4 mr-2" />,
            href: "/tickets",
        },
    ];

    const onClick = (href: string) => {
        router.push(href);
    };

    return (
        <div>
            {routes.map((route, i) => (
                <Button 
                    key={route.href}
                    size="sm"
                    onClick={() => onClick(route.href)}
                    className={cn(
                        "w-full font-normal justify-start pl-10 mb-1",
                        pathname === route.href && "bg-sky-500/10 text-sky-700"
                    )}
                >
                    {route.icon}
                    {route.label}
                </Button>
            ))}
        </div>
    )


}