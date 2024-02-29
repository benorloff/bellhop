import { cache } from "react";

import { db } from "@/lib/db";

export const getSite = cache(async (id: string) => {

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