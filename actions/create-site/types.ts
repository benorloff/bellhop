import { z } from "zod";
import { Site } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateSite } from "./schema";

export type InputType = z.infer<typeof CreateSite>;
export type ReturnType = ActionState<InputType, Site>;