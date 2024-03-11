import Stripe from "stripe";
import { DashboardTitle } from "@/components/dashboard-title"
import { getStripePrices } from "@/lib/get-stripe-prices";
import { unitPriceToDollars } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PricingTable } from "@/components/pricing-table";
import { stripe } from "@/lib/stripe";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getSubscription } from "@/lib/subscription";
import { StripeButton } from "@/components/stripe-button";
import Image from "next/image";

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
            {/* <PricingTable prices={prices} /> */}
            <div className="items-start justify-center gap-6 grid grid-cols-1 lg:grid-cols-2 mb-6">
                <Card className="h-full">
                    <CardHeader>
                        <div className="flex flex-row items-start justify-between">
                            <div>
                                <CardTitle>{product?.name}</CardTitle>
                                <CardDescription>{product?.description}</CardDescription>
                            </div>
                            <div>
                                <span className="font-semibold text-2xl">
                                    {unitPriceToDollars(price?.unitAmount!)}
                                </span>
                                <span className="text-muted-foreground">
                                    {` / ${price?.interval}`}
                                </span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        Info about plan usage
                    </CardContent>
                    <CardFooter className="flex flex-row items-center justify-between">
                        <div>
                            Next billing date:{` `}{subscription?.currentPeriodEnd.toLocaleDateString()}
                        </div>
                        <StripeButton priceId={price?.id!} label="Manage Plan" flow_data="subscription_update"/>
                    </CardFooter>
                </Card>
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>Payment Method</CardTitle>
                        <CardDescription>Change how you pay for your plan.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-row items-center gap-4 w-full border p-4 rounded-md">
                            <div>
                                <Image 
                                    height={47}
                                    width={75} 
                                    src={`/icons/${default_payment_method.card?.brand}.svg` || '/icons/default.svg'}
                                    alt={default_payment_method.card?.brand!}
                                />
                            </div>
                            <div className="grow">
                                <span className="text-lg">
                                    •••• •••• •••• {default_payment_method.card?.last4}
                                </span>
                                <div className="flex flex-row gap-2 items-center text-muted-foreground">
                                    <span>Expiry:{` `}</span> 
                                    <div className="space-x-1">
                                        <span>{default_payment_method.card?.exp_month}</span>
                                        <span>/</span>
                                        <span>{default_payment_method.card?.exp_year}</span>
                                    </div>
                                </div>
                            </div>
                            <StripeButton priceId={price?.id!} label="Update" flow_data="payment_method_update"/>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                    <CardDescription>View past payments and invoices.</CardDescription>
                </CardHeader>
                <CardContent>
                    Data table with invoices will go here.
                </CardContent>
            </Card>
        </>
    )
};

export default BillingPage;