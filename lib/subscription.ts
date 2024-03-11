import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs"
import { db } from "@/lib/db";
import 'server-only'

// Check to seee is the current org has an active subscription
export const checkSubscription = async () => {
    const { orgId } = auth();

    if (!orgId) {
        return false;
    };

    const subscription = await db.subscription.findUnique({
        where: {
            orgId,
        },
        select: {
            status: true,
            currentPeriodEnd: true,
        }
    });

    if (!subscription) {
        return false;
    };

    const isValid = subscription.status === "active" && new Date(subscription.currentPeriodEnd) > new Date();

    // Return subscription validity as boolean
    return !!isValid;
}

// Retrieve the current subscription for the current org
export const getSubscription = async () => {
    const { orgId } = auth();

    if (!orgId) {
        redirect("/select-org");
    };

    const subscription = await db.subscription.findUnique({
        where: {
            orgId,
        },
        include: {
            price: {
                include: 
                {
                    product: true,
                }
            }
        },
    });

    return { 
        subscription, 
        price: subscription?.price, 
        product: subscription?.price.product
    };
}