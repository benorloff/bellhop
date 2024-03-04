import { DashboardTitle } from "@/components/dashboard-title"
import { createStripeSession } from "@/lib/create-stripe-session";
import { StripeButton } from "@/components/stripe-button";
import { createStripePortalSession } from "@/lib/create-stripe-portal-session";

const BillingPage = async () => {

    const stripeSession = await createStripeSession();
    const stripePortalSession = await createStripePortalSession();

    return (
        <>
            <DashboardTitle title="Billing" />
            <StripeButton url={stripeSession?.data!} label="Checkout"/>
            <StripeButton url={stripePortalSession?.data!} label="Portal"/>
        </>
    )
};

export default BillingPage;