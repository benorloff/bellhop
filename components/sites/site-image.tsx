"use client";

import Image from "next/image";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useModal } from "@/hooks/use-modal-store";
import { Site } from "@prisma/client";


export const SiteImage = (
    site
: Site) => {
    const { onOpen } = useModal();

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Image 
                        src={site.imageUrl || "/placeholder-browser.svg"}
                        alt={site.name}
                        height={100}
                        width={150}
                        className="rounded-sm"
                    />
                </TooltipTrigger>
                <TooltipContent
                    side="bottom"
                >
                    <Button
                        variant="ghost"
                        onClick={() => onOpen("siteImage", { site })}
                    >
                        {/* TODO: Connect to update-site action */}
                        Upload image
                    </Button>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
};

SiteImage.Skeleton = function SkeletonSiteImage() {
    return (
            <Skeleton className="h-[100px] w-[150px]" />
    )
}