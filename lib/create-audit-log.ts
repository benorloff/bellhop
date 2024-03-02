import { auth, currentUser } from "@clerk/nextjs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";

interface CreateAuditLogProps {
    entityId: string;
    entityType: ENTITY_TYPE,
    entityTitle: string;
    action: ACTION;
};

export const createAuditLog = async (props: CreateAuditLogProps) => {
    try {
        const { orgId } = auth();
        const user = await currentUser();

        if (!user || !orgId) {
            throw new Error("Unauthorized");
        }

        const { entityId, entityType, entityTitle, action } = props;

        await db.auditLog.create({
            data: {
                orgId,
                entityId,
                entityType,
                entityTitle,
                action,
                userId: user.id,
                userImage: user?.imageUrl,
                userName: user?.firstName + " " + user?.lastName,
            }
        })
    } catch (error) {
        console.log("[AUDIT_LOG_ERROR]", error);
    }
};