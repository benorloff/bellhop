"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";

import { CreateSiteMember } from "./schema";
import { InputType, ReturnType } from "./types";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Member, Prisma } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
    const user = await currentUser();
    const { inviteId } = data;

    if ( !user ) {
        redirectToSignIn();
    }

    let invite: Prisma.InviteGetPayload<{
        include: {
            site: true;
        };
    }> | null;

    try {
        invite = await db.invite.findUnique({
            where: {
                id: inviteId,
                expiresAt: {
                    gte: new Date()
                },
            },
            include: {
                site: true,
            }
        });
    } catch (error) {
        return {
            error: "Invite not found.",
        };
    }

    if ( !invite || invite.recipientEmail !== user?.emailAddresses[0].emailAddress ) {
        return {
            error: "You are not the intended recipient of this invitation."
        }
    };

    let member: Member;

    try {
        member = await db.member.create({
            data: {
                userId: user.id,
                userName: `${user.firstName} ${user.lastName}`,
                userImage: user.imageUrl,
                siteId: invite.siteId,
                role: "COLLABORATOR",
            },
        });
        redirect(`/organization/${invite.site.orgSlug}/${invite.siteId}`)
    } catch (error) {
        console.log(error);
        return {
            error: "Failed to create member.",
        };
    }

    return { data: {member,invite} };
};

export const createSiteMember = createSafeAction(CreateSiteMember, handler);
