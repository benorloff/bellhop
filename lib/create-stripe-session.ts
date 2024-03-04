import { auth, currentUser, clerkClient } from "@clerk/nextjs";

import { stripe } from "@/lib/stripe";

export const createStripeSession = async () => {
    const { userId, orgId } = auth();

    if ( !userId || !orgId ) {
        return {
            error: "Unauthorized",
        };
    }
    const user = await clerkClient.users.getUser(userId);
    const { name } = await clerkClient.organizations.getOrganization({ organizationId: orgId })
    const stripeCustomerId = user?.privateMetadata?.stripeCustomerId! || "";
    console.log(stripeCustomerId, "<-- stripeCustomerId from createStripeSession")

    let url;

    try {
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: `http://localhost:3000/organization/${orgId}`,
            cancel_url: `http://localhost:3000/organization/${orgId}`,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price: "price_1Oq10CLA7PFYEsElMrDFUuBa",
                    quantity: 1,
                }
            ],
            metadata: {
                orgId,
                orgName: name,
            },
        });
        url = stripeSession.url;
    } catch (error) {
        return {
            error,
        }
    };

    return { data: url };
}