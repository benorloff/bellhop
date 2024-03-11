import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { StripeButton } from "../stripe-button";
import Stripe from "stripe";
import { Price } from "@prisma/client";

interface BillingPaymentMethodProps {
    default_payment_method: Stripe.PaymentMethod;
    price: Price;
};

export const BillingPaymentMethod = ({
    default_payment_method,
    price,
}: BillingPaymentMethodProps) => {
    return (
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
    )
};