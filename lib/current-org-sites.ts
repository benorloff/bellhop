import { auth, redirectToSignIn } from "@clerk/nextjs"; 

import { db } from "@/lib/db";

export const currentOrgSites = async (id: string) => {
    const { orgId } = auth();

    if (!orgId) {
        redirectToSignIn();
    }

    const sites = await db.site.findMany({
        where: {
            orgId: id,
        }
    });

    return sites;
};