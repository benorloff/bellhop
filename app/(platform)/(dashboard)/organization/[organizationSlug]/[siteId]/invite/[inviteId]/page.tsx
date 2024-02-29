import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";

interface InviteIdPageProps {
    params: {
        inviteId: string;
    };
};

const InviteIdPage = async ({
    params
}: InviteIdPageProps) => {
    const { userId } = auth();

    const profile = await currentProfile(userId as string);

    if (!profile) {
        return redirectToSignIn();
    }

    const invite = await db.invite.findUnique({
        where: {
            id: params.inviteId
        },
        include: {
            site: true,
        }
    });
    
    if (!invite || invite.expiresAt < new Date()) {
        throw new Error("Invite not found or has expired");
    }

    if (invite.recipientEmail !== profile.email) {
        throw new Error("You are not authorized to view this invite");
    }

    // const existingMember = await db.site.findFirst({
    //     where: {
    //         id: invite.siteId,
    //         members: {
    //             some: {
    //                 profileId: profile.id
    //             }
    //         }
    //     }
    // });

    // if (existingMember) {
    //     throw new Error("You are already a member of this site")
    //     return redirect('/dashboard');
    // }

    const member = await db.member.create({
        data: {
            profileId: profile.id,
            siteId: invite.siteId
        }
    });

    const sitePath = `/organization/${invite.site.orgSlug}/${invite.site.id}`

    return redirect(sitePath);
};

export default InviteIdPage;