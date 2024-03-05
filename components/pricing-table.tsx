import { currentUser } from "@clerk/nextjs";
import { Price, Prisma, Product } from "@prisma/client";
import { StripeButton } from "./stripe-button";
import { unitPriceToDollars } from "@/lib/utils";

interface PricingTableProps {
    // For type safety, include the related product reocord
    prices: Prisma.PriceGetPayload<{
        include: { product: true }
    }>[];
};

export const PricingTable = async ({
    prices,
}: PricingTableProps) => {

    return (
        <div className="flex flex-row gap-4 w-full">
            {prices.map((price) => (
                <div key={price.id} className="flex flex-col gap-2 w-40 border p-8">
                    <div>{price.product.name}</div>
                    <p className="text-3xl">
                        {unitPriceToDollars(price.unitAmount)}
                    </p>
                    <StripeButton
                        priceId={price.id}
                        label="Get Started"
                    />
                </div>
            ))}
        </div>
    )
}