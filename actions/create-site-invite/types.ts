import { z } from "zod";

import { Invite } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";

import { CreateSiteInvite } from "./schema";

export type InputType = z.infer<typeof CreateSiteInvite>;
export type ReturnType = ActionState<InputType, Invite>;