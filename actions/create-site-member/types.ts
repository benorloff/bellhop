import { z } from "zod";

import { Invite, Member, Prisma } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";

import { CreateSiteMember } from "./schema";

interface OutputType {
    member: Member;
    invite: Prisma.InviteGetPayload<{
        include: {
            site: true;
        };
    }> | null;
}

export type InputType = z.infer<typeof CreateSiteMember>;
export type ReturnType = ActionState<InputType, OutputType>;