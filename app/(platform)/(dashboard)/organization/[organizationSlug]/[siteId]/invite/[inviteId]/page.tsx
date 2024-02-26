import { redirectToSignIn } from "@clerk/nextjs";
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
    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }

    if (!params.inviteId) {
        return redirect("/");
    }

    const existingMember = await db.site.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    // if (existingMember) {
    //     // Redirect to the site
    // }

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

    return (
        <div>
            <h1>Invite</h1>
            <p>Invite to {invite.site.name}</p>
            <p>Expires at: {invite.expiresAt.toLocaleString()}</p>
            <Button>Accept</Button>
            <Button>Decline</Button>
        </div>
    )
};

export default InviteIdPage;