import { z } from "zod";

export const CreateSiteInvite = z.object({
    email: z.string({
        required_error: "Email address is required",
    }),
    siteId: z.string({
        required_error: "Site ID is required",
    }),
    profileId: z.string({
        required_error: "Profile ID is required",
    }),
});