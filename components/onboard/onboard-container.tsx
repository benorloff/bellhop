"use client"

import { useOnboardStore } from "../providers/onboard-provider";
import { OnboardOrgInfo } from "./onboard-org-info";
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
    }
};

export const OnboardContainer = ({
    user,
    org,
}: OnboardContainerProps) => {
    const { step } = useOnboardStore(
        (state) => state,
    );

        switch (step) {
            case 1:
                return <OnboardUserInfo user={user} />;
            case 2:
                return <OnboardOrgInfo org={org} />;
            case 3:
                return <OnboardSiteInfo />;
            case 4:
                return <div>Step 4</div>;
            default:
                return <div>Uh oh, no step.</div>;
        }
}