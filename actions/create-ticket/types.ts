import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";

import { CreateTicket } from "./schema";

export type InputType = z.infer<typeof CreateTicket>;
export type ReturnType = ActionState<InputType, string>;