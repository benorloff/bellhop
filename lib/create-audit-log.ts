import { auth, currentUser } from "@clerk/nextjs";
import { Action, EntityType } from "@prisma/client";

import { db } from "@/lib/db";

interface CreateAuditLogProps {
    siteId?: string;
    entityId: string;
    entityType: EntityType,
    entityTitle: string;
    action: Action;
};

export const createAuditLog = async (props: CreateAuditLogProps) => {
    let auditLog;
    try {
        const { orgId } = auth();
        const user = await currentUser();

        if (!user || !orgId) {
            throw new Error("Unauthorized");
        }

        const { siteId, entityId, entityType, entityTitle, action } = props;

        auditLog = await db.auditLog.create({
            data: {
                orgId,
                siteId: siteId || null,
                entityId,
                entityType,
                entityTitle,
                action,
                userId: user.id,
                userImage: user?.imageUrl,
                userName: `${user?.firstName} ${user?.lastName}`,
            }
        })
    } catch (error) {
        console.log("[AUDIT_LOG_ERROR]", error);
    }

    return { data: auditLog };
};