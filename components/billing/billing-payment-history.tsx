import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { auth, currentUser } from "@clerk/nextjs";
import { Subscription } from "@prisma/client";
import { redirect } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { DataTable } from "./data-table";
import { columns } from "./columns";

interface BillingPaymentHistoryProps {
    subscription: Subscription;
}

export const BillingPaymentHistory = async ({
    subscription,
}: BillingPaymentHistoryProps) => {
    
    let invoices;

    try {
        invoices = await stripe.invoices.list({
            subscription: subscription?.id,
            expand: ["data.subscription"],
        });
    } catch (error) {
        console.error("Error fetching invoices", error)
        throw new Error("Error fetching invoices")
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>View past payments and invoices.</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable 
                    columns={columns}
                    data={invoices?.data}
                />
            </CardContent>
        </Card>
    );
};

BillingPaymentHistory.Skeleton = function SkeletonBillingPaymentHistory() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>View past payments and invoices.</CardDescription>
            </CardHeader>
            <CardContent>
                <Skeleton className="w-full h-60" />
            </CardContent>
        </Card>
    )
};