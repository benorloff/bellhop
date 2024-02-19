import { z } from "zod";
import { Site } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { UpdateSite } from "./schema";

export type InputType = z.infer<typeof UpdateSite>;
export type ReturnType = ActionState<InputType, Site>;