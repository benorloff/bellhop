import { DashboardTitle } from "@/components/dashboard-title"
import { getStripePrices } from "@/lib/get-stripe-prices";
import { unitPriceToDollars } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PricingTable } from "@/components/pricing-table";


const BillingPage = async () => {

    const prices = await getStripePrices();

    return (
        <>
            <DashboardTitle />
            <PricingTable prices={prices} />
        </>
    )
};

export default BillingPage;