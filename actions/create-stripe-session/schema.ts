import { z } from "zod";

export const StripeSession = z.object({
    priceId: z.string().optional(),
    customerId: z.string().optional(),
    // flow_data should be an enum
    // "supscription_update" | "supscription_cancel" | "subscription_update_confirm" | "payment_method_update"
    flow_data: z.any().optional(),
    label: z.string(),
});