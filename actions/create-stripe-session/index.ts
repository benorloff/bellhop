"use server";

import { auth, currentUser } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { StripeSession } from "./schema";
import { stripe } from "@/lib/stripe";
import { InputType, ReturnType } from "./types";
import { revalidatePath } from "next/cache";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { orgId } = auth();
    const user = await currentUser();

    if (!user || !orgId ) {
        throw new Error('You must be logged in to perform this action')
    }

    const stripeCustomerId = user.privateMetadata.stripeCustomerId as string || "";

    let url = '';

    try {
        const subscription = await db.subscription.findUnique({
            where: {
                customer: stripeCustomerId,
            }
        });

        if (subscription) {
            const stripePortalSession = await stripe.billingPortal.sessions.create({
                customer: stripeCustomerId,
                return_url: "http://localhost:3000/settings/billing",
            });
            url = stripePortalSession.url;
        } else {
            const stripeCheckoutSession = await stripe.checkout.sessions.create({
                mode: 'subscription',
                payment_method_types: ['card'],
                customer_email: user.emailAddresses[0].emailAddress,
                billing_address_collection: 'auto',
                success_url: "http://localhost:3000/settings/billing",
                cancel_url: "http://localhost:3000/settings/billing",
                line_items: [
                    {
                        price: data.priceId,
                        quantity: 1,
                    },
                ],
                metadata: {
                    orgId,
                }
            });
            url = stripeCheckoutSession.url || '';
        }
    } catch {
        throw new Error('Something went wrong!')
    }
    revalidatePath('/settings/billing');
    return { data: url };
};

export const createStripeSession = createSafeAction(StripeSession, handler);
