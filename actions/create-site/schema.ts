import { z } from "zod";

export const CreateSite = z.object({
    name: z.string({
        required_error: "Site name is required",
        invalid_type_error: "Site name is required",
    }).min(3, {
        message: "Site name must be at least 3 characters long."
    }),
    slug: z.string({
        required_error: "Site slug is required",
        invalid_type_error: "Site slug is required",
    }).min(3, {
        message: "Site slug must be at least 3 characters long."
    }),
    url: z.string({
        required_error: "Site URL is required",
        invalid_type_error: "Site URL is required",
    }),
});