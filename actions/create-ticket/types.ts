import { z } from "zod";
import { Ticket } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateTicket } from "./schema";

export type InputType = z.infer<typeof CreateTicket>;
export type ReturnType = ActionState<InputType, Ticket>;