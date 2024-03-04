import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

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

    if (event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );

        if (!session?.metadata?.orgId) {
            return new NextResponse("Org ID is required", { status: 400 });
        }

        console.log(subscription, '<-- Stripe subscription data from session');

        // TODO: Create a new subscription in the database
    }

    if (event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );

        console.log(subscription, '<-- Stripe subscription data from session');

        // TODO: Update the subscription in the database
    }

    return new NextResponse("Webhook received", { status: 200 });
}