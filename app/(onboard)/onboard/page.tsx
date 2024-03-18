import { useOnboardStore } from "@/components/providers/onboard-provider";
import { OnboardStepper } from "@/components/onboard/onboard-stepper";
import { Button } from "@/components/ui/button";
import { OnboardUserInfo } from "@/components/onboard/onboard-user-info";
import { use, useEffect } from "react";
import { auth, clerkClient, currentUser, useAuth } from "@clerk/nextjs";
import { getUser } from "@/lib/get-user";
import { OnboardOrgInfo } from "@/components/onboard/onboard-org-info";
import { redirect } from "next/navigation";
import { OnboardContainer } from "@/components/onboard/onboard-container";
import { OnboardFooter } from "@/components/onboard/onboard-footer";

const OnboardPage = async () => {

    const user = await currentUser();
    const { orgId } = auth();
    
    if (!user) {
        return redirect("/sign-in");
    };

    if (!orgId) {
        return redirect("/select-org");
    };
    
    const organization = await clerkClient.organizations.getOrganization({ organizationId: orgId! });
    
    const _user = {
        firstName: user?.firstName!,
        lastName: user?.lastName!,
        email: user?.emailAddresses[0].emailAddress,
        imageUrl: user?.imageUrl,
    }

    const org = {
        name: organization?.name!,
        imageUrl: organization?.imageUrl!,
    }

    return (
        <div className="flex flex-col items-center justify-center border rounded-md p-8 space-y-4 min-w-[500px]">
            <OnboardStepper />
            <div className="text-3xl">Onboarding</div>
            <OnboardContainer user={_user} org={org} />
            <OnboardFooter />
        </div>
    )
};

export default OnboardPage;