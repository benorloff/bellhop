"use server";

import { auth, currentUser } from "@clerk/nextjs";
import { Action, EntityType, MemberRole } from "@prisma/client";

import { createSafeAction } from "@/lib/create-safe-action";
import { createAuditLog } from "@/lib/create-audit-log";
import { db } from "@/lib/db";

import { InputType, ReturnType } from "./types";
import { CreateSite } from "./schema";


const handler = async (data: InputType): Promise<ReturnType> => {
    console.log(data, "data")
    const { orgId, orgSlug } = auth();
    const user = await currentUser();
    

    if ( !user || !orgId || ! orgSlug ) {
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
                userId: user.id,
                name,
                slug,
                url,
                imageUrl,
                orgId,
                orgSlug,
                ipAddress,
                members: {
                    create: [
                        { 
                            userId: user.id,
                            userName: `${user.firstName} ${user.lastName}`,
                            userImage: user.imageUrl, 
                            role: MemberRole.OWNER
                        }
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