import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";

import { CreateComment } from "./schema";

interface Comment {
    request_id: number;
    author_id: number;
    body: string;
}

export type InputType = z.infer<typeof CreateComment>;
export type ReturnType = ActionState<InputType, Comment>;