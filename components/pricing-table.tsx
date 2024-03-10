import { unitPriceToDollars } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { StripeButton } from "./stripe-button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface PricingTableProps {
  // For type safety, include the related product reocord
  prices: Prisma.PriceGetPayload<{
    include: { product: true };
  }>[];
}

export const PricingTable = async ({ prices }: PricingTableProps) => {

  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const subscription = await db.subscription.findUnique({
    where: {
      orgId,
    }
  })

  return (
    <div className="flex flex-row gap-4 w-full">
      {prices.map((price) => (
        <div key={price.id} className="flex flex-col justify-between gap-2 border p-8">
          <div>
            <div>{price.product.name}</div>
            <p className="text-3xl">{unitPriceToDollars(price.unitAmount)}</p>
          </div>
          <StripeButton priceId={price.id} label={price.id === subscription?.priceId ? "Current" : "Change Plan"} />
        </div>
      ))}
    </div>
  );
};
