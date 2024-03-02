import { auth, currentUser } from "@clerk/nextjs";

import { stripe } from "@/lib/stripe";

export const createStripeSession = async () => {
    const { userId, orgId } = auth();
    const user = await currentUser();

    if (!userId || !orgId || !user) {
        return {
            error: "Unauthorized",
        };
    }

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