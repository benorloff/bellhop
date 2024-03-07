import { auth } from "@clerk/nextjs"
import { db } from "./db";

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