import { Button } from "@/components/ui/button";
import { createStripeSession } from "@/lib/create-stripe-session";
import { redirect } from "next/navigation";
import { StripeButton } from "../_components/stripe-button";


const BillingPage = async () => {

    const stripeSession = await createStripeSession();

    console.log(stripeSession, "<-- stripe session from billing page")

    return (
        <div>
            <StripeButton url={stripeSession?.data!} />
        </div>
    )
};

export default BillingPage;