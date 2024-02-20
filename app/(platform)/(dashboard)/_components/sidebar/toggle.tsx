"use client";

import { useSidebar } from "@/hooks/use-sidebar-store";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";

export const Toggle = () => {
    const {
        collapsed,
        onCollapse,
        onExpand,
    } = useSidebar((state) => state);

    const label = collapsed ? "Expand" : "Collapse"
    
    return ( 
        <>
            {collapsed && (
                <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
                    <Hint label={label} side="right" asChild>
                        <Button 
                            onClick={onExpand}
                            className="h-auto p-2 absolute right-[-15px] top-4 bg-background border rounded-full" 
                            variant="ghost"
                        >
                            <ArrowRightFromLine className="h-3 w-3"/>
                        </Button>
                    </Hint>
                </div>
            )}
            {!collapsed && (
                <div className="p-3 pl-6 mb-2 flex items-center w-full">
                    <Hint label={label} side="right" asChild>
                        <Button 
                            onClick={onCollapse}
                            className="h-auto p-2 absolute right-[-15px] top-4 bg-background border rounded-full" 
                            variant="ghost"
                        >
                            <ArrowLeftFromLine className="h-3 w-3"/>
                        </Button>
                    </Hint>
                </div>
            )}
        </>
     );
}