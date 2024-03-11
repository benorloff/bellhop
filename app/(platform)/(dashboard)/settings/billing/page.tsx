import Stripe from "stripe";

import { getSubscription } from "@/lib/subscription";
import { stripe } from "@/lib/stripe";

import { BillingPaymentHistory } from "@/components/billing/billing-payment-history";
import { BillingPaymentMethod } from "@/components/billing/billing-payment-method";
import { BillingPlan } from "@/components/billing/billing-plan";
import { Suspense } from "react";

const BillingPage = async () => {

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const { subscription, price, product } = await getSubscription();
    const stripeSubscription = await stripe.subscriptions.retrieve(
        subscription?.id!, {
            expand: ['default_payment_method'],
        }
    );

    const default_payment_method = stripeSubscription.default_payment_method as Stripe.PaymentMethod;

    return (
        <>
            <div className="items-start justify-center gap-6 grid grid-cols-1 lg:grid-cols-2 mb-6">
                <BillingPlan 
                    subscription={subscription!} 
                    product={product!} 
                    price={price!} 
                />
                <BillingPaymentMethod 
                    default_payment_method={default_payment_method} 
                    price={price!}
                />
            </div>
            <Suspense fallback={<BillingPaymentHistory.Skeleton />}>
                <BillingPaymentHistory 
                    subscription={subscription!}
                />
            </Suspense>
        </>
    )
};

export default BillingPage;