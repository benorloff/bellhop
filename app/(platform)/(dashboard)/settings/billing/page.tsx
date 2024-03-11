import { BillingPaymentHistory } from "@/components/settings/billing-payment-history";
import { BillingPaymentMethod } from "@/components/settings/billing-payment-method";
import { BillingPlan } from "@/components/settings/billing-plan";
import { getStripePrices } from "@/lib/get-stripe-prices";
import { stripe } from "@/lib/stripe";
import { getSubscription } from "@/lib/subscription";
import Stripe from "stripe";

const BillingPage = async () => {

    const prices = await getStripePrices();
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
            <BillingPaymentHistory />
        </>
    )
};

export default BillingPage;