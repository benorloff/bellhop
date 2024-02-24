import { z } from "zod";

export const CreateOrgInvite = z.object({
    email: z.string({
        required_error: "Email address is required",
    }),
});