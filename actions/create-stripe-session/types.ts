import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";

import { StripeSession } from "./schema";

export type InputType = z.infer<typeof StripeSession>;
export type ReturnType = ActionState<InputType, string>;