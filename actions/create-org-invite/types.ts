import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";

import { CreateOrgInvite } from "./schema";

interface OrgInvitation {
    id: string;
    object: string;
    email_address: string;
    role: string;
    organization_id: string;
    status: string;
    public_metadata: object;
    private_metadata: object;
    created_at: Date;
    updated_at: Date;
}

export type InputType = z.infer<typeof CreateOrgInvite>;
export type ReturnType = ActionState<InputType, OrgInvitation>;