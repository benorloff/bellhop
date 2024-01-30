import { z } from "zod";

// See https://developers.freshdesk.com/api/#create_ticket

export const CreateTicket = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "This does not appear to be a valid email address",
    }).email({
        message: "Invalid email address"
    }),
    subject: z.string({
        required_error: "Subject is required",
        invalid_type_error: "Subject must be a string",
    }),
    // Should we create ticket type enums?
    type: z.string({
        required_error: "Type is required",
        invalid_type_error: "Type must be a string",
    }),
    // 2 - Open, 3 - Pending, 4 - Resolved, 5 - Closed
    status: z.number({
        required_error: "Status is required",
        invalid_type_error: "Status must be a number",
    }).int({
        message: "Status must be an integer"
    }).gte(2, {
        message: "Status must be at least 2"
    }).lte(5, {
        message: "Status must be at most 5"
    }),
    // 1 - Low, 2 - Medium, 3 - High, 4 - Urgent
    priority: z.number({
        required_error: "Priority is required",
        invalid_type_error: "Priority must be a number",
    }).int({
        message: "Priority must be an integer"
    }).gte(1, {
        message: "Priority must be at least 1"
    }).lte(4, {
        message: "Priority must be at most 4"
    }),
    description: z.string({
        required_error: "Description is required",
        invalid_type_error: "Description must be a string",
    }),
    // 1 - Email, 2 - Portal, 3 - Phone, 7 - Chat, 9 - Feedback Widget, 10 - Outbound Email
    source: z.number({
        required_error: "Source is required",
        invalid_type_error: "Source must be a number",
    }).int({
        message: "Source must be an integer"
    }),
    custom_fields: z.object({
        site_id: z.string(),
    })
});