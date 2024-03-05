import { db } from "@/lib/db";

export const getStripePrices = async () => {
  const prices = await db.price.findMany();

  return prices;
}