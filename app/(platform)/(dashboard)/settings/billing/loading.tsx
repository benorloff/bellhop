import { BillingPaymentHistory } from "@/components/billing/billing-payment-history";
import { BillingPaymentMethod } from "@/components/billing/billing-payment-method";
import { BillingPlan } from "@/components/billing/billing-plan";

const BillingPageLoading = () => {
    return (
        <>
            <div className="items-start justify-center gap-6 grid grid-cols-1 lg:grid-cols-2 mb-6">
                <BillingPlan.Skeleton />
                <BillingPaymentMethod.Skeleton />
            </div>
            <BillingPaymentHistory.Skeleton />
        </>
    )
};

export default BillingPageLoading;