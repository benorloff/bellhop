import { z } from "zod";

// See https://developers.freshdesk.com/api/#create_ticket

export const CreateWaitlistSignup = z.object({
    email: z.string().email({
        message: "Please enter a valid email address."
    }),
    referral_link: z.string()
});