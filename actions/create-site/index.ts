"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateSite } from "./schema";


const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        };
    };

    const { name, slug, url } = data;

    let site;

    try {
        site = await db.site.create({
            data: {
                name,
                slug,
                url,
                userId,
                orgId,
            }
        })
    } catch (error) {
        console.log(error);
        return {
            error: "Failed to create site."
        }
    }

    revalidatePath(`/site/${site.slug}`);
    return { data: site };
};

export const createSite = createSafeAction(CreateSite, handler);