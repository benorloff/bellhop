import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";

import { CreateSiteInvite } from "./schema";

interface Message {
    to: string;
    from: string;
    templateId: string;
    dynamicTemplateData: object;
}

export type InputType = z.infer<typeof CreateSiteInvite>;
export type ReturnType = ActionState<InputType, Message>;