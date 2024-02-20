import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";

import { InviteUser } from "./schema";

export type InputType = z.infer<typeof InviteUser>;
export type ReturnType = ActionState<InputType, object>;