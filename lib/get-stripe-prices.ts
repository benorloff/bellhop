import { cache } from "react";
import 'server-only';

import { db } from "@/lib/db";

export const preload = () => {
    void getStripePrices();
};

export const getStripePrices = cache(async () => {

    const prices = await db.price.findMany({
      include: {
          product: true,
      }
    })

    return prices;
});