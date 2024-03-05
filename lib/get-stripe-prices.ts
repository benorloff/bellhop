import { db } from "@/lib/db";

export const getStripePrices = async () => {
  const prices = await db.price.findMany({
    include: {
      product: true,
    }
  });

  return prices;
}