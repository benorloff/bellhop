import Image from "next/image";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

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
                    className="w-[150px] text-center"
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