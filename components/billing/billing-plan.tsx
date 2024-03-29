import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { unitPriceToDollars } from "@/lib/utils";
import { Price, Product, Subscription } from "@prisma/client";
import { StripeButton } from "../stripe-button";
import { Skeleton } from "../ui/skeleton";

interface BillingPlanProps {
    subscription: Subscription;
    product: Product;
    price: Price;
};

export const BillingPlan = ({
    subscription,
    product,
    price,
}: BillingPlanProps) => {
    return (
        <Card className="h-full">
            <CardHeader>
                <div className="flex flex-row items-start justify-between">
                    <div className="space-y-2">
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
            <CardContent>Info about plan usage</CardContent>
            <CardFooter className="flex flex-row items-center justify-between">
                <div>
                    Next billing date:{` `}
                    {subscription?.currentPeriodEnd.toLocaleDateString()}
                </div>
                <StripeButton
                    priceId={price?.id!}
                    label="Manage Plan"
                    flow_data="subscription_update"
                />
            </CardFooter>
        </Card>
    );
};

BillingPlan.Skeleton = function SkeletonBillingPlan() {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>
                    <Skeleton className="w-32 h-6" />
                </CardTitle>
                <CardDescription>
                    <Skeleton className="w-32 h-4" />
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Skeleton className="w-full h-4" />
            </CardContent>
            <CardFooter className="flex flex-row items-center justify-between">
                <Skeleton className="w-32 h-4" />
                <Skeleton className="w-24 h-10" />
            </CardFooter>
        </Card>
    )
};