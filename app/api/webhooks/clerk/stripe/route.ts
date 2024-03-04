import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

const relevantEvents = new Set([
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

    const session = event.data.object as Stripe.Checkout.Session;

    // See example:
    // https://github.com/vercel/nextjs-subscription-payments/blob/main/app/api/webhooks/route.ts
    if (relevantEvents.has(event.type)) {
        try {
            switch (event.type) {
                case "checkout.session.completed":
                    const checkoutSession = event.data.object as Stripe.Checkout.Session;
                    if (!checkoutSession?.metadata?.orgId) {
                        return new NextResponse("Org ID is required", { status: 400 });
                    }
                    // TODO: Create a new subscription in the database
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