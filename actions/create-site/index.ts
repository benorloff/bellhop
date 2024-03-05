"use server";

import { auth } from "@clerk/nextjs";
import { Action, EntityType, MemberRole } from "@prisma/client";

import { createSafeAction } from "@/lib/create-safe-action";
import { createAuditLog } from "@/lib/create-audit-log";
import { db } from "@/lib/db";

import { InputType, ReturnType } from "./types";
import { CreateSite } from "./schema";


const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId, orgSlug } = auth();
    

    if ( !userId || !orgId || ! orgSlug ) {
        return {
            error: "Unauthorized",
        };
    };

    const { name, slug, url, imageUrl, ipAddress } = data;

    let site;

    try {
        // Create the site
        site = await db.site.create({
            data: {
                userId,
                name,
                slug,
                url,
                imageUrl,
                orgId,
                orgSlug,
                ipAddress,
                members: {
                    create: [
                        { userId, role: MemberRole.OWNER}
                    ]
                }
            }
        })

        // Create audit log for site creation
        await createAuditLog({
            entityTitle: site.name,
            entityId: site.id,
            entityType: EntityType.SITE,
            action: Action.CREATE,
        })
    } catch (error) {
        console.log(error);
        return {
            error: "Failed to create site."
        }
    }

    return { data: site };
};

export const createSite = createSafeAction(CreateSite, handler);