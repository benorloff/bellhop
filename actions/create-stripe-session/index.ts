"use server";

import { auth, currentUser } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { StripeSession } from "./schema";
import { stripe } from "@/lib/stripe";
import { InputType, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { flow } from "lodash";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { orgId } = auth();
    const user = await currentUser();

    if (!user || !orgId ) {
        throw new Error('You must be logged in to perform this action')
    }

    // Get the user's stripe customer id from Clerk
    const stripeCustomerId = user.privateMetadata.stripeCustomerId as string || "";
    
    let url = '';
    
    if (data.flow_data === "payment_method_update") {
        try {
            const stripePortalSession = await stripe.billingPortal.sessions.create({
                customer: stripeCustomerId,
                return_url: "http://localhost:3000/settings/billing",
                flow_data: {
                    type: data.flow_data,
                }
            });
            url = stripePortalSession.url;
        } catch (error) {
            console.log(error, "<-- error")
            throw new Error('Something went wrong!')
        }
        revalidatePath('/settings/billing');
        return { data: url };
    } else {
        try {
            // Retrieve the subscription from the database
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
                        userId: user.id,
                    }
                });
                url = stripeCheckoutSession.url || '';
            }
        } catch (error) {
            console.log(error, "<-- error")
            throw new Error('Something went wrong!')
        }
        revalidatePath('/settings/billing');
        return { data: url };
    };
}

export const createStripeSession = createSafeAction(StripeSession, handler);
