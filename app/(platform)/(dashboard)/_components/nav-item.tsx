"use client";

import { useRouter } from "next/navigation";
import { 
    Layout,
    Laptop,
    Tag
 } from "lucide-react";

export const NavItem = () => {
    const router = useRouter();

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
                <div className="flex items-center py-4" key={i}>
                    {route.icon}
                    {route.label}
                </div>
            ))}
        </div>
    )


}