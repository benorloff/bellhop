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
import { redirect } from "next/navigation";

export const BillingPaymentHistory = async () => {
    const { orgId } = auth();
    
    if (!orgId) {
        return redirect("/select-org");
    }

    let subscription; 

    try {
        subscription = await db.subscription.findUnique({
            where: {
                orgId
            }
        })
    } catch (error) {
        console.error("Error fetching subscription", error)
        throw new Error("Error fetching subscription")
    }
    
    let invoices;

    try {
        invoices = await stripe.invoices.list({
            subscription: subscription?.id
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
                {invoices?.data.map((invoice) => {
                    return (
                        <div key={invoice.id}>
                            <p>{invoice.id}</p>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
};
