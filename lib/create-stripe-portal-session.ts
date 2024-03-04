import { auth, clerkClient } from "@clerk/nextjs";

import { stripe } from "@/lib/stripe";

export const createStripePortalSession = async () => {
    const { userId, orgId } = auth();

    if ( !userId || !orgId ) {
        return {
            error: "Unauthorized",
        };
    }
    const user = await clerkClient.users.getUser(userId);
    const { name } = await clerkClient.organizations.getOrganization({ organizationId: orgId })
    const stripeCustomerId = user?.privateMetadata?.stripeCustomerId! || "";

    let url;

    try {
        const session = await stripe.billingPortal.sessions.create({
            customer: `${stripeCustomerId}`,
            return_url: `http://localhost:3000/settings/billing`,
        });
        url = session.url;
    } catch (error) {
        return {
            error,
        }
    };

    return { data: url };
}