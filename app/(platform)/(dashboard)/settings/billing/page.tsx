import { DashboardTitle } from "@/components/dashboard-title"
import { createStripeSession } from "@/lib/create-stripe-session";
import { StripeButton } from "@/components/stripe-button";
import { createStripePortalSession } from "@/lib/create-stripe-portal-session";
import { getStripePrices } from "@/lib/get-stripe-prices";
import { unitPriceToDollars } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const BillingPage = async () => {

    // const stripeSession = await createStripeSession();
    // const stripePortalSession = await createStripePortalSession();

    const prices = await getStripePrices();

    return (
        <>
            <DashboardTitle title="Billing" />
            <div className="flex flex-row gap-4 w-full">
                {prices.map((price) => (
                    <div key={price.id} className="flex flex-col gap-2">
                        <Link href="#">
                            <Button>{unitPriceToDollars(price.unitAmount)}</Button>
                        </Link>
                    </div>
                ))}
            </div>
            {/* <StripeButton url={stripeSession?.data!} label="Checkout"/>
            <StripeButton url={stripePortalSession?.data!} label="Portal"/> */}
        </>
    )
};

export default BillingPage;