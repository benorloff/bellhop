"use server";

import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { UpdateSite } from "./schema";


const handler = async (data: InputType): Promise<ReturnType> => {
    const { orgId } = auth();

    if ( !orgId ) {
        return {
            error: "Unauthorized",
        };
    };

    const { siteId, imageUrl } = data;

    let site;

    try {
        site = await db.site.update({
            where: {
                id: siteId
            },
            data: {
                imageUrl,
            },  
        })
    } catch (error) {
        console.log(error);
        return {
            error: "Failed to udpate site."
        }
    }

    // Add redirect/revalidate to site page here?

    return { data: site };
};

export const updateSite = createSafeAction(UpdateSite, handler);