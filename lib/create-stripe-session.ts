import { auth, clerkClient } from "@clerk/nextjs";

import { stripe } from "@/lib/stripe";

interface CreateStripeSessionProps {
    priceId: string;
}

export const createStripeSession = async ({
    priceId,
}: CreateStripeSessionProps) => {
    const { userId } = auth();

    if (!userId) {
        return {
            error: "Unauthorized",
        }
    };

    const user = await clerkClient.users.getUser(userId);

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
                    price: priceId,
                    quantity: 1,
                }
            ],
        });
        url = stripeSession.url;
    } catch (error) {
        return {
            error,
        }
    };

    return { data: url };
}