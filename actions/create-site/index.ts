"use server";

import { auth } from "@clerk/nextjs";
import { Action, EntityType, MemberRole } from "@prisma/client";

import { createSafeAction } from "@/lib/create-safe-action";
import { createAuditLog } from "@/lib/create-audit-log";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { InputType, ReturnType } from "./types";
import { CreateSite } from "./schema";


const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId, orgSlug } = auth();
    

    if ( !orgId || ! orgSlug ) {
        return {
            error: "Unauthorized",
        };
    };

    const profile = await currentProfile(userId);

    if (!profile) {
        return {
            error: "Profile not found",
        };
    }

    const { name, slug, url, imageUrl, ipAddress } = data;

    let site;

    try {
        // Create the site
        site = await db.site.create({
            data: {
                name,
                slug,
                url,
                imageUrl,
                profileId: profile.id,
                orgId,
                orgSlug,
                ipAddress,
                members: {
                    create: [
                        { profileId: profile.id, role: MemberRole.OWNER}
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