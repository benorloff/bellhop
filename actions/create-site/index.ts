"use server";

import { z } from "zod";

import { db } from "@/lib/db";

const CreateSite = z.object({
    name: z.string(),
});

export async function create(formData: FormData) {
    const { name } = CreateSite.parse({
        name: formData.get("name"),
    });

    await db.site.create({
        data: {
            name,
        }
    });
};