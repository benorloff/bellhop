"use client"

import { Prisma } from "@prisma/client";
import { useOnboardStore } from "../providers/onboard-provider";
import { OnboardOrgInfo } from "./onboard-org-info";
import { OnboardPlanInfo } from "./onboard-plan-info";
import { OnboardSiteInfo } from "./onboard-site-info";
import { OnboardUserInfo } from "./onboard-user-info";

interface OnboardContainerProps {
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
    user,
    org,
    prices,
}: OnboardContainerProps) => {
    const { step: { number } } = useOnboardStore(
        (state) => state,
    );

        switch (number) {
            case 1:
                return <OnboardUserInfo user={user} />;
            case 2:
                return <OnboardOrgInfo org={org} />;
            case 3:
                return <OnboardSiteInfo />;
            case 4:
                return <OnboardPlanInfo prices={prices}/>;
            default:
                return <div>Uh oh, no step.</div>;
        }
}