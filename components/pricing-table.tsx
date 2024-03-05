interface PricingTableProps {
    priceId: string;
};

export const PricingTable = async ({
    priceId,
}: PricingTableProps) => {
    return (
        <div className="flex flex-row gap-4 w-full">
            {/* {prices.map((price) => (
                <div key={price.id} className="flex flex-col gap-2">
                    <Link href={await createStripeSession(price.id)}>
                        <Button>{unitPriceToDollars(price.unitAmount)}</Button>
                    </Link>
                </div>
            ))} */}
        </div>
    )
}