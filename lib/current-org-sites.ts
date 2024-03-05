import { auth } from "@clerk/nextjs"; 
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

export const currentOrgSites = async () => {
    const { orgId } = auth();

    if (!orgId) {
        return redirect("/select/org");
    }

    const sites = await db.site.findMany({
        where: {
            orgId,
        }, 
        include: {
            members: true
        },
    });

    return sites;
};