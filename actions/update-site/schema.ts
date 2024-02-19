import { z } from "zod";

export const UpdateSite = z.object({
    siteId: z.string({
        required_error: "Site ID is required",
        invalid_type_error: "Site name must be a string",
    }),
    imageUrl: z.string().url({
        message: "Image URL is invalid"
    }),
    // TODO: Add additional fields
});