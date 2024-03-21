import { redirect } from "next/navigation";

import { auth, clerkClient, currentUser } from "@clerk/nextjs";

import { OnboardContainer } from "@/components/onboard/onboard-container";
import { OnboardFooter } from "@/components/onboard/onboard-footer";
import { OnboardHeader } from "@/components/onboard/onboard-header";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { getStripePrices } from "@/lib/get-stripe-prices";

const OnboardPage = async () => {

    // User must have an active session to access this page.
    // This is a server-side route, so we can use the Clerk API
    // to get the current user and organization ID.
    const user = await currentUser();
    const { orgId } = auth();
    
    // If the user is not signed in, redirect them to the sign-in page.
    if (!user) {
        return redirect("/sign-in");
    };

    // If there is no active organization,
    // redirect the user to the organization selection page.
    if (!orgId) {
        return redirect("/select-org");
    };

    let organization;

    // Use the org ID from the user's session to get the organization object.
    try {
        organization = await clerkClient.organizations.getOrganization({ organizationId: orgId! });
    } catch (error) {
        console.error(error);
        return { error: "Organization not found" };
    }
    
    // Only pass the necessary user data to the client.
    const _user = {
        firstName: user?.firstName!,
        lastName: user?.lastName!,
        email: user?.emailAddresses[0].emailAddress,
        imageUrl: user?.imageUrl,
    }

    // Only pass the necessary organization data to the client.
    const org = {
        name: organization?.name!,
        imageUrl: organization?.imageUrl!,
    }

    const prices = await getStripePrices();

    return (
        <div className="flex flex-col items-center justify-start gap-4 w-[500px]">
            <OnboardHeader />
            <OnboardContainer user={_user} org={org} prices={prices}/>
            <OnboardFooter />
        </div>
    )
};

export default OnboardPage;