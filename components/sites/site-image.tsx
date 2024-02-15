import Image from "next/image";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

export const SiteImage = ({
    imageUrl,
    siteName
}: {
    imageUrl: string;
    siteName: string;
}) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Image 
                        src={imageUrl || "/placeholder-browser.svg"}
                        alt={siteName}
                        width={150}
                        height={100}
                    />
                </TooltipTrigger>
                <TooltipContent
                    side="bottom"
                >
                    <Button>
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