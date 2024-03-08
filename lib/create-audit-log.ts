import { auth, currentUser } from "@clerk/nextjs";
import { Action, EntityType } from "@prisma/client";

import { db } from "@/lib/db";

interface CreateAuditLogProps {
    orgId: string;
    siteId?: string;
    action: Action;
    entityId: string;
    entityType: EntityType,
    entityTitle: string;
    userId: string;
    userImage: string;
    userName: string;
};

export const createAuditLog = async (props: CreateAuditLogProps) => {
    let auditLog;
    try {
        const user = await currentUser();

        if (!user) {
            throw new Error("Unauthorized");
        }

        const { 
            orgId, 
            siteId, 
            action, 
            entityId, 
            entityType, 
            entityTitle,
            userId,
            userImage,
            userName,
        } = props;

        auditLog = await db.auditLog.create({
            data: {
                orgId,
                siteId: siteId || null,
                action,
                entityId,
                entityType,
                entityTitle,
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