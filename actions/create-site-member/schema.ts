import { MemberRole } from "@prisma/client";
import { z } from "zod";

export const CreateSiteMember = z.object({
    inviteId: z.string({
        required_error: "Invite ID is required",
    }),
});