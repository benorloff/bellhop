import { z } from "zod";

export const InviteUser = z.object({
    email: z.string({
        required_error: "Email address is required",
    }),
});