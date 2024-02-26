import { z } from "zod";

export const CreateSiteInvite = z.object({
    email: z.string({
        required_error: "Email address is required",
    }),
    site: z.any(),
    profile: z.any(),
});