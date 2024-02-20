"use client";

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

import { useSidebar } from "@/hooks/use-sidebar-store";
import { cn } from "@/lib/utils";



interface ContainerProps {
    children: React.ReactNode;
};

export const Container = ({
    children
}: ContainerProps) => {
    const matches = useMediaQuery("(max-width: 1024px)");
    const { 
        collapsed,
        onCollapse,
        onExpand, 
    } = useSidebar((state) => state);

    useEffect(() => {
        if (matches) {
            onCollapse();
        } else {
            onExpand();
        }
    }, [matches, onCollapse, onExpand]);

    return (
        <div className={cn(
            "flex-1 p-8",
            collapsed ? "ml-16" : "ml-16 lg:ml-48"
        )}>
            {children}
        </div>
    )
};