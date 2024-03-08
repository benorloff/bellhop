import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { Member, Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

interface InviteIdPageProps {
    params: {
        inviteId: string;
    };
};

const InviteIdPage = async ({
    params
}: InviteIdPageProps) => {
    const user = await currentUser();

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
                id: params.inviteId,
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
    } catch (error) {
        console.log(error);
        return {
            error: "Failed to create member.",
        };
    }

    if (member) {
        return redirect(`/organization/${invite.site.orgSlug}/${invite.siteId}`)
    }

    return null;

};

export default InviteIdPage;