import { z } from "zod";

// See https://developers.freshdesk.com/api/#create_ticket

export const CreateComment = z.object({
    body: z.string({
        required_error: "Comment is required",
        invalid_type_error: "Comment must be a string",
    }),
    ticket_id: z.number(),
    file: z.object({
        name: z.string(),
        size: z.number(),
        key: z.string(),
        serverData: z.any().optional(),
        url: z.string(),
    }).optional(),
});