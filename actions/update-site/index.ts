"use server";

import { auth, currentUser } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { UpdateSite } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { Action, EntityType } from "@prisma/client";


const handler = async (data: InputType): Promise<ReturnType> => {

    const { orgId } = auth();
    const user = await currentUser();
    const { siteId, imageUrl } = data;

    if (!user || !orgId) {
        return {
            error: "Unauthorized",
        };
    }

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
            error: "Failed to update site."
        }
    }

    try {
        await createAuditLog({
          orgId,
          siteId: siteId,
          action: Action.UPDATE,
          entityId: siteId,
          entityType: EntityType.SITE,
          entityTitle: imageUrl,
          userId: user.id,
          userImage: user.imageUrl,
          userName: `${user.firstName} ${user.lastName}`,
        });
      } catch (error) {
        console.log(error);
        return {
          error: "Failed to create audit log for ticket creation.",
        };
      }

    // Add redirect/revalidate to site page here?

    return { data: site };
};

export const updateSite = createSafeAction(UpdateSite, handler);