import { cache } from "react";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const getSite = cache(async (id: string) => {
    const { userId } = auth();

    if (!userId) {
        return null;
    }

    const site = await db.site.findUnique({ 
        where: {
            id
        },
        include: {
            members: {
                include: {
                    profile: true,
                },
            }
        }
     })
    return site;
});