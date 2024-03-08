import { db } from "@/lib/db";
import { clerkClient, currentUser, redirectToSignIn } from "@clerk/nextjs";
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
        return redirectToSignIn();
    }

    // Get the invite from db
    const invite = await db.invite.findUnique({
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


    if ( !invite || invite.recipientEmail !== user?.emailAddresses[0].emailAddress ) {
        throw new Error ("You are not the intended recipient of this invitation.")
    };


    // Create site membership for the invited user
    const member = await db.member.create({
        data: {
            userId: user.id,
            userName: `${user.firstName} ${user.lastName}`,
            userImage: user.imageUrl,
            siteId: invite.siteId,
            role: "COLLABORATOR",
        },
    });


    // Add the invitee to the site's organization
    const orgMember = await clerkClient.organizations.createOrganizationMembership({
            organizationId: invite.site.orgId,
            userId: user.id,
            role: "org:guest",
    })

    if (member) {
        return redirect(`/organization/${invite.site.orgSlug}/${invite.siteId}`)
    }

    return null;

};

export default InviteIdPage;