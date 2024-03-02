"use server";

import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { currentProfile } from "@/lib/current-profile";

import { InputType, ReturnType } from "./types";
import { CreateSite } from "./schema";
import { ACTION, ENTITY_TYPE, MemberRole } from "@prisma/client";
import { createAuditLog } from "@/lib/create-audit-log";


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

        await createAuditLog({
            entityTitle: site.name,
            entityId: site.id,
            entityType: ENTITY_TYPE.SITE,
            action: ACTION.CREATE,
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