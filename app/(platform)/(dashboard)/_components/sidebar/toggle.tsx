"use client";

import { useSidebar } from "@/hooks/use-sidebar-store";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import {  
    TooltipProvider,
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from "@/components/ui/tooltip";

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
                <TooltipProvider>
                    <Tooltip delayDuration={50}>
                        <TooltipTrigger asChild>
                            <Button 
                                onClick={onExpand}
                                className="h-auto p-2" 
                                variant="ghost"
                            >
                                <ArrowRightFromLine className="h-4 w-4"/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" align="center">
                            <p className="font-semibold text-sm">Expand</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        )}
        {!collapsed && (
            <div className="p-3 pl-6 mb-2 flex items-center w-full">
                <TooltipProvider>
                    <Tooltip delayDuration={50}>
                        <TooltipTrigger asChild>
                            <Button 
                                onClick={onCollapse}
                                className="h-auto p-2 ml-auto" 
                                variant="ghost"
                            >
                                <ArrowLeftFromLine className="h-4 w-4"/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" align="center">
                            <p className="font-semibold text-sm">Collapse</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        )}
        </>
     );
}