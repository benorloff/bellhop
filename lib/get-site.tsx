import { cache } from "react";
import 'server-only';

import { db } from "@/lib/db";

export const preload = (id: string) => {
    void getSite(id);
};

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