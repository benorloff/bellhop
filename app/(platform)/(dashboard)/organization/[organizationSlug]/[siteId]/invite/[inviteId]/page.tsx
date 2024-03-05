import { auth, currentUser, redirectToSignIn } from "@clerk/nextjs";
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
    const user = await currentUser();

    if (!user) {
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

    if (invite.recipientEmail !== user.emailAddresses[0].emailAddress) {
        throw new Error("You are not the intended recipient of this invite");
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
            userId: user.id,
            siteId: invite.siteId
        }
    });

    const sitePath = `/organization/${invite.site.orgSlug}/${invite.site.id}`

    return redirect(sitePath);
};

export default InviteIdPage;