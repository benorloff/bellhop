import { z } from "zod";

// See https://developers.freshdesk.com/api/#create_ticket

export const CreateTicket = z.object({
    subject: z.string({
        required_error: "Subject is required",
        invalid_type_error: "Subject must be a string",
    }),
    type: z.string({
        required_error: "Type is required",
        invalid_type_error: "Type must be a string",
    }),
    description: z.string({
        required_error: "Description is required",
        invalid_type_error: "Description must be a string",
    }),
    // TODO: Custom Fields for user_id, org_id, and site_id
    // See https://support.freshdesk.com/en/support/solutions/articles/216548
});