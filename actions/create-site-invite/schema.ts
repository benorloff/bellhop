import { z } from "zod";

export const CreateSiteInvite = z.object({
    email: z.string().email({
        message: "Invalid email address",
    }),
    siteId: z.string({
        required_error: "Site ID is required",
    }),
    siteName: z.string({
        required_error: "Site name is required",
    }),
});