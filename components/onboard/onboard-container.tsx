"use client"

import { Prisma } from "@prisma/client";
import { useOnboardStore } from "../providers/onboard-provider";
import { OnboardOrgInfo } from "./onboard-org-info";
import { OnboardPlanInfo } from "./onboard-plan-info";
import { OnboardSiteInfo } from "./onboard-site-info";
import { OnboardUserInfo } from "./onboard-user-info";
import { OnboardFooter } from "./onboard-footer";
import { cn } from "@/lib/utils";

interface OnboardContainerProps {
    className?: string;
    user: {
        firstName: string;
        lastName: string;
        email: string;
        imageUrl: string;
    },
    org: {
        name: string;
        imageUrl: string;
    },
    prices: Prisma.PriceGetPayload<{
        include: { product: true };
    }>[];
};

export const OnboardContainer = ({
    className,
    user,
    org,
    prices,
}: OnboardContainerProps) => {
    const { step: { number } } = useOnboardStore(
        (state) => state,
    );

    return (
        <div
            className={cn(
                "w-[500px]",
                className
            )}
        >
            {number === 1 && <OnboardUserInfo user={user} />}
            {number === 2 && <OnboardOrgInfo org={org} />}
            {number === 3 && <OnboardSiteInfo />}
            {number === 4 && <OnboardPlanInfo prices={prices} />}
        </div>
    )
}