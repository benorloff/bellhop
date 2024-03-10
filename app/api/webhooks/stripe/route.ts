import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { PriceInterval, SubscriptionStatus } from "@prisma/client";
import { clerkClient, currentUser } from "@clerk/nextjs";

const relevantEvents = new Set([
    'product.created',
    'product.deleted',
    'product.updated',
    'price.created',
    'price.deleted',
    'price.updated',
    'customer.created',
    'customer.updated',
    'customer.deleted',
    'checkout.session.completed',
    'customer.subscription.created',
    'customer.subscription.deleted',
    'customer.subscription.updated',
    'invoice.payment_succeeded',
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
        
        let stripeProduct;
        let stripePrice;
        let stripeSubscription;
        let stripeCustomer;
        let subscription;

        try {
            switch (event.type) {
                case "customer.created":
                    stripeCustomer = event.data.object as Stripe.Customer;
                    // Add customer's stripe id to their user metadata in Clerk
                    break;
                case "customer.updated":
                    // Add customer's stripe id to their user metadata
                    break;
                case "customer.deleted":
                    // Add customer's stripe id to their user metadata
                    break;
                case "checkout.session.completed":
                    const checkoutSession = event.data.object as Stripe.Checkout.Session;
                    const orgId = checkoutSession?.metadata?.orgId;
                    const userId = checkoutSession?.metadata?.userId;
                    if (!orgId) {
                        return new NextResponse("Org ID is required", { status: 400 });
                    }
                    if (!userId) {
                        return new NextResponse("User ID is required", { status: 400 });
                    }
                    // Add stripe customer id to user metadata in Clerk
                    await clerkClient.users.updateUserMetadata(userId, {
                        privateMetadata: {
                            stripeCustomerId: checkoutSession.customer,
                        }
                    });
                    const subscription = await stripe.subscriptions.update(
                        checkoutSession.subscription as string,
                        {
                            metadata: {
                                orgId,
                            }
                        }
                    );
                    // Save the subscription to the database
                    await db.subscription.create({
                        data: {
                            id: checkoutSession.subscription as string,
                            customer: checkoutSession.customer as string,
                            orgId,
                            status: SubscriptionStatus.active,
                            quantity: 1,
                            currency: checkoutSession.currency as string,
                            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                            currentPeriodStart: new Date(subscription.current_period_start * 1000),
                            cancelAtPeriodEnd: subscription.cancel_at_period_end,
                            canceledAt: subscription.canceled_at ? new Date(subscription.canceled_at * 1000) : null,
                            endedAt: subscription.ended_at ? new Date(subscription.ended_at * 1000) : null,
                            cancelAt: subscription.cancel_at ? new Date(subscription.cancel_at * 1000) : null,
                            trialStart: subscription.trial_start ? new Date(subscription.trial_start * 1000) : null,
                            trialEnd: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
                            metadata: subscription.metadata as Record<string, string>,
                            priceId: subscription.items.data[0].price.id,
                            createdAt: new Date(subscription.created * 1000),
                        }
                    })
                    // Console log the checkout session
                    console.log("Checkout session completed", checkoutSession);
                    break;
                /**
                 * STRIPE PRODUCT CREATED
                 */
                case "product.created":
                    stripeProduct = event.data.object as Stripe.Product;
                    // Save the product to the database
                    const product_created = await db.product.create({
                        data: {
                            id: stripeProduct.id,
                            name: stripeProduct.name,
                            description: stripeProduct.description,
                            active: stripeProduct.active,
                            image: stripeProduct.images[0],
                            metadata: stripeProduct.metadata as Record<string, string>,
                            // Convert the unix timestamp to a date
                            createdAt: new Date(stripeProduct.created * 1000),
                        }
                    })
                    // Console log the product
                    console.log("Product created", product_created);
                    break;
                /**
                 * STRIPE PRODUCT UPDATED
                 */
                case "product.updated":
                    stripeProduct = event.data.object as Stripe.Product;
                    // Update the product in the database
                    const product_updated = await db.product.update({
                        where: {
                            id: stripeProduct.id
                        },
                        data: {
                            name: stripeProduct.name,
                            description: stripeProduct.description,
                            active: stripeProduct.active,
                            image: stripeProduct.images[0],
                            metadata: stripeProduct.metadata as Record<string, string>,
                            // Convert the unix timestamp to a date
                            updatedAt: new Date(stripeProduct.updated * 1000),
                        }
                    })
                    // Console log the product
                    console.log("Product updated", product_updated);
                    break;
                /**
                 * STRIPE PRODUCT DELETED
                 */
                case "product.deleted":
                    stripeProduct = event.data.object;
                    // Delete the product in the database
                    const product_deleted = await db.product.delete({
                        where: {
                            id: stripeProduct.id
                        },
                    })
                    // Console log the response
                    console.log("Product deleted", product_deleted);
                    break;
                /**
                 * STRIPE PRICE CREATED
                 */
                case "price.created":
                    stripePrice = event.data.object as Stripe.Price;
                    // Save the price to the database
                    const price_created = await db.price.create({
                        data: {
                            id: stripePrice.id,
                            active: stripePrice.active,
                            nickname: stripePrice.nickname,
                            unitAmount: stripePrice.unit_amount as number,
                            currency: stripePrice.currency,
                            type: stripePrice.type,
                            interval: stripePrice.recurring?.interval!,
                            intervalCount: stripePrice.recurring?.interval_count!,
                            metadata: stripePrice.metadata as Record<string, string>,
                            productId: stripePrice.product as string,
                            // Convert the unix timestamp to a date
                            createdAt: new Date(stripePrice.created * 1000),
                        }
                    })
                    // Console log the price
                    console.log("Price created", price_created);
                    break;
                /**
                 * STRIPE PRICE UPDATED
                 */
                case "price.updated":
                    stripePrice = event.data.object as Stripe.Price;
                    // Save the price to the database
                    const price_updated = await db.price.update({
                        where: {
                            id: stripePrice.id
                        },
                        data: {
                            active: stripePrice.active,
                            nickname: stripePrice.nickname,
                            unitAmount: stripePrice.unit_amount as number,
                            currency: stripePrice.currency,
                            type: stripePrice.type,
                            interval: stripePrice.recurring?.interval!,
                            intervalCount: stripePrice.recurring?.interval_count!,
                            metadata: stripePrice.metadata as Record<string, string>,
                            productId: stripePrice.product as string,
                        }
                    })
                    // Console log the price
                    console.log("Price updated", price_updated);
                    break;
                /**
                 * STRIPE PRICE DELETED
                 */
                case "price.deleted":
                    stripePrice = event.data.object;
                    // Save the price to the database
                    const price_deleted = await db.price.delete({
                        where: {
                            id: stripePrice.id
                        }
                    })
                    // Console log the response
                    console.log("Price deleted", price_deleted);
                    break;
                /**
                 * STRIPE SUBSCRIPTION CREATED
                 */
                case "customer.subscription.created":
                    stripeSubscription = event.data.object as Stripe.Subscription;
                    if (!stripeSubscription?.metadata?.orgId) {
                        return new NextResponse("Org ID is required", { status: 400 });
                    }
                    // Save the subscription to the database
                    const subscription_created = await db.subscription.create({
                        data: {
                            id: stripeSubscription.id,
                            customer: stripeSubscription.customer as string,
                            orgId: stripeSubscription.metadata.orgId,
                            status: stripeSubscription.status as SubscriptionStatus,
                            quantity: 1,
                            currency: stripeSubscription.currency as string,
                            currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
                            currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
                            cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
                            canceledAt: stripeSubscription.canceled_at ? new Date(stripeSubscription.canceled_at * 1000) : null,
                            endedAt: stripeSubscription.ended_at ? new Date(stripeSubscription.ended_at * 1000) : null,
                            cancelAt: stripeSubscription.cancel_at ? new Date(stripeSubscription.cancel_at * 1000) : null,
                            trialStart: stripeSubscription.trial_start ? new Date(stripeSubscription.trial_start * 1000) : null,
                            trialEnd: stripeSubscription.trial_end ? new Date(stripeSubscription.trial_end * 1000) : null,
                            metadata: stripeSubscription.metadata as Record<string, string>,
                            priceId: stripeSubscription.items.data[0].price.id,
                            createdAt: new Date(stripeSubscription.created * 1000),
                        }
                    });
                    // Console log the response
                    console.log("Subscription created", subscription_created);
                    break;
                /**
                 * STRIPE SUBSCRIPTION UPDATED
                 */
                case "customer.subscription.updated":
                    stripeSubscription = event.data.object as Stripe.Subscription;
                    if (!stripeSubscription?.metadata?.orgId) {
                        return new NextResponse("Org ID is required", { status: 400 });
                    }
                    // Update the subscription in the database
                    const subscription_updated = await db.subscription.update({
                        where: {
                            id: stripeSubscription.id
                        },
                        data: {
                            customer: stripeSubscription.customer as string,
                            orgId: stripeSubscription.metadata.orgId,
                            status: stripeSubscription.status as SubscriptionStatus,
                            quantity: stripeSubscription.items.data[0].quantity,
                            currency: stripeSubscription.currency as string,
                            currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
                            currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
                            cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
                            canceledAt: stripeSubscription.canceled_at ? new Date(stripeSubscription.canceled_at * 1000) : null,
                            endedAt: stripeSubscription.ended_at ? new Date(stripeSubscription.ended_at * 1000) : null,
                            cancelAt: stripeSubscription.cancel_at ? new Date(stripeSubscription.cancel_at * 1000) : null,
                            trialStart: stripeSubscription.trial_start ? new Date(stripeSubscription.trial_start * 1000) : null,
                            trialEnd: stripeSubscription.trial_end ? new Date(stripeSubscription.trial_end * 1000) : null,
                            metadata: stripeSubscription.metadata as Record<string, string>,
                            priceId: stripeSubscription.items.data[0].price.id,                        }
                    });
                    // Console log the response
                    console.log("Subscription updated", subscription_updated);
                    break;
                /**
                 * STRIPE SUBSCRIPTION DELETED
                 */
                case "customer.subscription.deleted":
                    stripeSubscription = event.data.object;
                    // Delete the subscription in the database
                    const subscription_deleted = await db.subscription.delete({
                        where: {
                            id: stripeSubscription.id
                        },
                    });
                    // Console log the response
                    console.log("Subscription deleted", subscription_deleted);
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