import { z } from "zod";

export const StripeSession = z.object({
    priceId: z.string(),
});