import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const BillingPaymentHistory = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>View past payments and invoices.</CardDescription>
            </CardHeader>
            <CardContent>Data table with invoices will go here.</CardContent>
        </Card>
    );
};
