import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { SubscriptionStatus } from "@prisma/client";

const relevantEvents = new Set([
    'customer.created',
    'customer.updated',
    'customer.deleted',
    'checkout.session.completed',
    'customer.subscription.created',
    'customer.subscription.deleted',
    'customer.subscription.updated',
    'invoice.payment_succeeded',
    'price.created',
    'price.deleted',
    'price.updated',
    'product.created',
    'product.deleted',
    'product.updated'
])

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body, 
            signature, 
            process.env.STRIPE_WEBHOOK_SECRET!,
        )
    } catch (error) {
        return new NextResponse("Webhook error", { status: 400 });
    }

    // See example:
    // https://github.com/vercel/nextjs-subscription-payments/blob/main/app/api/webhooks/route.ts
    if (relevantEvents.has(event.type)) {
        try {
            switch (event.type) {
                case "customer.created":
                    // Add customer's stripe id to their user metadata
                    break;
                case "checkout.session.completed":
                    const checkoutSession = event.data.object as Stripe.Checkout.Session;
                    if (!checkoutSession?.metadata?.orgId) {
                        return new NextResponse("Org ID is required", { status: 400 });
                    }
                    // Log the checkout session
                    console.log("Checkout session completed", checkoutSession);
                    break;
                case "customer.subscription.created":
                    const stripeSubscription = event.data.object as Stripe.Subscription;
                    if (!stripeSubscription?.metadata?.orgId) {
                        return new NextResponse("Org ID is required", { status: 400 });
                    }
                    // Save the subscription to the database
                    await db.subscription.create({
                        data: {
                            id: stripeSubscription.id,
                            customer: stripeSubscription.customer as string,
                            orgId: stripeSubscription.metadata.orgId,
                            status: stripeSubscription.status as SubscriptionStatus,
                            quantity: 1,
                            currency: stripeSubscription.currency as string,
                            currentPeriodEnd: new Date(stripeSubscription.current_period_end),
                            currentPeriodStart: new Date(stripeSubscription.current_period_start),
                            cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
                            canceledAt: stripeSubscription.canceled_at ? new Date(stripeSubscription.canceled_at) : null,
                            endedAt: stripeSubscription.ended_at ? new Date(stripeSubscription.ended_at) : null,
                            cancelAt: stripeSubscription.cancel_at ? new Date(stripeSubscription.cancel_at) : null,
                            trialStart: stripeSubscription.trial_start ? new Date(stripeSubscription.trial_start) : null,
                            trialEnd: stripeSubscription.trial_end ? new Date(stripeSubscription.trial_end) : null,
                            metadata: stripeSubscription.metadata as Record<string, string>,
                            priceId: stripeSubscription.items.data[0].price.id,
                            createdAt: new Date(stripeSubscription.created),
                        }
                    });
                    break;
                default:
                    throw new Error("Unhandled relevant event!");
            }
        } catch (error) {
            console.log(error);
            return new Response(
                'Stripe webhook handler failed. View logs for more details.',
                {
                    status: 400
                }
            )
        }
    } else {
        return new Response(
            `Unsupported event type: ${event.type}`,
            { 
                status: 400
            }
        );
    }

    return new NextResponse("Webhook received", { status: 200 });
}